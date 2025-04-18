use tauri_bridge;
use tauri_plugin_devtools;
use tauri_plugin_notification::NotificationExt;
use tauri_plugin_utils;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// async fn minimize_window<R: Runtime>(app: tauri::AppHandle<R>) -> Result<(), String> {
//     println!("[tauri] minimize_window invoked");
//     let window = app.get_webview_window("main").ok_or_else(|| "Window not found".to_string())?;
//     window.minimize().map_err(|e| e.to_string())
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let devtools = tauri_plugin_devtools::init();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_bridge::init())
        .plugin(tauri_plugin_utils::init())
        .plugin(devtools)
        .plugin(tauri_plugin_notification::init())
        // .invoke_handler(tauri::generate_handler![greet, minimize_window])
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
