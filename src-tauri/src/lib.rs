/// Application information exposed to the frontend.
#[derive(serde::Serialize)]
struct AppInfo {
    /// Application name from Cargo.toml.
    name: &'static str,
    /// Application version from Cargo.toml.
    version: &'static str,
}

/// Tauri command to retrieve application information.
///
/// Returns the app name and version from compile-time environment variables
/// defined in Cargo.toml. This command is callable from the frontend via
/// Tauri's invoke mechanism.
///
/// # Returns
///
/// Returns an [`AppInfo`] struct containing:
/// - `name`: The package name from `CARGO_PKG_NAME`
/// - `version`: The package version from `CARGO_PKG_VERSION`
///
/// # Examples
///
/// ```typescript
/// import { invoke } from '@tauri-apps/api/core'
/// const info = await invoke<AppInfo>('get_app_info')
/// console.log(`${info.name} v${info.version}`)
/// ```
#[tauri::command]
fn get_app_info() -> AppInfo {
    AppInfo {
        name: env!("CARGO_PKG_NAME"),
        version: env!("CARGO_PKG_VERSION"),
    }
}

/// GitHub release information structure.
///
/// Represents a release fetched from the GitHub API, containing version tag,
/// release notes body, creation timestamp, and URL to the release page.
#[derive(serde::Deserialize)]
struct GitHubRelease {
    /// Git tag name for this release (e.g., "v1.0.0").
    tag_name: String,
    /// Release notes body content. May be empty or contain a default message.
    body: Option<String>,
    /// ISO 8601 timestamp of when the release was created.
    created_at: String,
}

/// Tauri command to fetch GitHub release notes for versions newer than current.
///
/// This command retrieves release information from GitHub for all versions
/// that are newer than the currently running application version. It handles
/// pagination, version comparison using semantic versioning, and generates
/// formatted release notes.
///
/// # Behavior
///
/// 1. Loads `.env` file for development environment variables
/// 2. Reads `GITHUB_OWNER` and `GITHUB_REPO` from environment
/// 3. Fetches all releases from GitHub API (with pagination)
/// 4. Filters releases to only include versions newer than current
/// 5. Sorts releases by version (newest first)
/// 6. Generates release notes from either:
///    - The release body content, or
///    - Merged pull requests since the release creation date
/// 7. Returns formatted markdown release notes
///
/// # Environment Variables
///
/// - `GITHUB_OWNER`: GitHub repository owner/organization name
/// - `GITHUB_REPO`: Repository name
/// - `GITHUB_TOKEN` (optional): GitHub personal access token for API authentication
///   Embedded at build time via `option_env!` macro
///
/// # Returns
///
/// Returns a formatted markdown string containing release notes for all
/// newer versions. If no new releases are available, returns
/// "No new releases available".
///
/// # Errors
///
/// Returns a `String` error message if:
/// - `GITHUB_OWNER` or `GITHUB_REPO` environment variables are not set
/// - Current app version cannot be parsed as semver
/// - HTTP client creation fails
/// - GitHub API request fails (network error, rate limit, etc.)
/// - JSON response parsing fails
/// - Version comparison fails
///
/// # Examples
///
/// ```typescript
/// import { invoke } from '@tauri-apps/api/core'
/// try {
///   const notes = await invoke<string>('get_release_notes')
///   console.log(notes)
/// } catch (error) {
///   console.error('Failed to fetch release notes:', error)
/// }
/// ```
#[tauri::command]
async fn get_release_notes() -> Result<String, String> {
    use semver::Version;

    // Load .env file for development
    dotenv::dotenv().ok();

    // Get GitHub token for authentication (embedded at build time)
    let github_token = option_env!("GITHUB_TOKEN");

    // Get current app version
    let current_version_str = env!("CARGO_PKG_VERSION");
    let current_version = Version::parse(current_version_str)
        .map_err(|e| format!("Failed to parse current version: {}", e))?;

    // Get GitHub repository information from environment variables
    let owner = std::env::var("GITHUB_OWNER")
        .map_err(|_| "GITHUB_OWNER environment variable not set".to_string())?;
    let repo = std::env::var("GITHUB_REPO")
        .map_err(|_| "GITHUB_REPO environment variable not set".to_string())?;

    let client = reqwest::Client::builder()
        .build()
        .map_err(|e| format!("Failed to build HTTP client: {}", e))?;

    // Fetch all releases (paginated)
    let mut all_releases: Vec<GitHubRelease> = Vec::new();
    let mut page = 1;
    const PER_PAGE: u32 = 30;

    loop {
        let api_url = format!(
            "https://api.github.com/repos/{}/{}/releases?per_page={}&page={}",
            owner, repo, PER_PAGE, page
        );

        let mut request = client
            .get(&api_url)
            .header("User-Agent", "tauri2-react-starter");

        // Add authorization header if token is available
        if let Some(token) = github_token {
            request = request.header("Authorization", format!("Bearer {}", token));
        }

        let response = request
            .send()
            .await
            .map_err(|e| format!("Failed to fetch releases page {}: {}", page, e))?;

        if !response.status().is_success() {
            return Err(format!("GitHub API returned error: {}", response.status()));
        }

        let releases: Vec<GitHubRelease> = response
            .json()
            .await
            .map_err(|e| format!("Failed to parse releases JSON: {}", e))?;

        if releases.is_empty() {
            break;
        }

        let releases_len = releases.len();

        for release in releases {
            // Parse version from tag_name (remove 'v' prefix if present)
            let version_str = release
                .tag_name
                .strip_prefix('v')
                .unwrap_or(&release.tag_name);
            if let Ok(version) = Version::parse(version_str) {
                // Only include releases newer than current version
                if version > current_version {
                    all_releases.push(release);
                }
            }
        }

        // Check if we have all releases
        if releases_len < PER_PAGE as usize {
            break;
        }

        page += 1;
    }

    if all_releases.is_empty() {
        return Ok("No new releases available".to_string());
    }

    // Sort releases by version (newest first)
    all_releases.sort_by(|a, b| {
        let ver_a = Version::parse(a.tag_name.strip_prefix('v').unwrap_or(&a.tag_name));
        let ver_b = Version::parse(b.tag_name.strip_prefix('v').unwrap_or(&b.tag_name));
        ver_b.unwrap().cmp(&ver_a.unwrap())
    });

    // Generate release notes for each version
    let mut all_notes = String::new();

    for release in all_releases {
        let tag_name = &release.tag_name;

        // Try to use release body if available
        if let Some(body) = &release.body {
            if !body.is_empty() && body != "See the assets to download this version and install." {
                all_notes.push_str(&format!("## {}\n\n", tag_name));
                all_notes.push_str(body);
                all_notes.push_str("\n\n---\n\n");
                continue;
            }
        }

        // If no body, fetch merged PRs for this release
        let search_query = format!(
            "repo:{}/{} is:pr is:merged merged:>={}",
            owner, repo, release.created_at
        );

        let search_url = format!(
            "https://api.github.com/search/issues?q={}&per_page=10&sort=created&order=desc",
            urlencoding::encode(&search_query)
        );

        let mut search_request = client
            .get(&search_url)
            .header("User-Agent", "tauri2-react-starter");

        // Add authorization header if token is available
        if let Some(token) = github_token {
            search_request = search_request.header("Authorization", format!("Bearer {}", token));
        }

        if let Ok(search_response) = search_request.send().await {
            if search_response.status().is_success() {
                if let Ok(search_json) = search_response.json::<serde_json::Value>().await {
                    if let Some(items) = search_json.get("items").and_then(|v| v.as_array()) {
                        if !items.is_empty() {
                            all_notes.push_str(&format!("## {}\n\n", tag_name));
                            all_notes.push_str("### What's Changed\n\n");

                            for item in items.iter().take(10) {
                                if let (Some(title), Some(number), Some(user)) = (
                                    item.get("title").and_then(|t| t.as_str()),
                                    item.get("number").and_then(|n| n.as_i64()),
                                    item.get("user")
                                        .and_then(|u| u.get("login"))
                                        .and_then(|l| l.as_str()),
                                ) {
                                    all_notes.push_str(&format!(
                                        "* {} by @{} in #{}\n",
                                        title, user, number
                                    ));
                                }
                            }

                            all_notes.push_str("\n\n---\n\n");
                        }
                    }
                }
            }
        }
    }

    // Add footer link
    all_notes.push_str(&format!(
        "*View [latest release](https://github.com/{}/{}/releases/latest) on GitHub*\n",
        owner, repo
    ));

    Ok(all_notes)
}

/// Initializes and runs the Tauri application.
///
/// This function serves as the main entry point for the Tauri application.
/// It configures and initializes all required Tauri plugins, registers
/// Tauri commands, and starts the application event loop.
///
/// # Plugin Configuration
///
/// The following plugins are initialized:
///
/// - **`tauri_plugin_opener`**: Opens URLs in the user's default browser
/// - **`tauri_plugin_store`**: Provides persistent key-value storage using JSON files
/// - **`tauri_plugin_process`**: Enables application relaunch and process control
/// - **`tauri_plugin_updater`**: Handles automatic update checks and installation (desktop only)
/// - **`tauri_plugin_window_state`**: Persists window position and size between sessions (release only)
///
/// # Build-Specific Behavior
///
/// - **Desktop builds**: Includes the updater plugin for automatic updates
/// - **Mobile builds**: Uses `mobile_entry_point` attribute for proper mobile initialization
/// - **Debug builds**: Window state plugin is excluded to prevent unwanted window
///   position restoration during development
/// - **Release builds**: Window state plugin is enabled for persistent window state
///
/// # Registered Commands
///
/// The following Tauri commands are registered and callable from the frontend:
///
/// - `get_app_info`: Returns application name and version
/// - `get_release_notes`: Fetches GitHub release notes for newer versions
///
/// # Panics
///
/// Panics if the Tauri application fails to start or if plugin initialization fails.
/// This typically indicates a configuration error in `tauri.conf.json`.
///
/// # Examples
///
/// This function is called from `main()`:
///
/// ```rust,no_run
/// tauri2_react_starter_lib::run()
/// ```
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Build Tauri builder with plugins
    // Window state plugin is only enabled in release builds to prevent
    // window position restoration during development
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_process::init())
        .setup(|app| {
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        });

    // Add window state plugin only in release builds
    #[cfg(not(debug_assertions))]
    let builder = builder.plugin(tauri_plugin_window_state::Builder::new().build());

    builder
        .invoke_handler(tauri::generate_handler![get_app_info, get_release_notes])
        .run(tauri::generate_context!())
        .expect("an error occurred while running the Tauri application");
}
