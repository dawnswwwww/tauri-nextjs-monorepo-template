use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::TaruiUtils;
#[cfg(mobile)]
use mobile::TaruiUtils;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the tarui-utils APIs.
pub trait TaruiUtilsExt<R: Runtime> {
  fn tarui_utils(&self) -> &TaruiUtils<R>;
}

impl<R: Runtime, T: Manager<R>> crate::TaruiUtilsExt<R> for T {
  fn tarui_utils(&self) -> &TaruiUtils<R> {
    self.state::<TaruiUtils<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("tarui-utils")
    .invoke_handler(tauri::generate_handler![commands::ping])
    .setup(|app, api| {
      #[cfg(mobile)]
      let tarui_utils = mobile::init(app, api)?;
      #[cfg(desktop)]
      let tarui_utils = desktop::init(app, api)?;
      app.manage(tarui_utils);
      Ok(())
    })
    .build()
}
