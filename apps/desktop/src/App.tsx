import { useEffect, useState } from 'react'
import { api } from '@repo/tauri-bridge-api'
import "./App.css";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { ping } from '@repo/tauri-plugin-utils-api';

function App() {
  const [platform, setPlatform] = useState<string>('')
  const [fileContent, setFileContent] = useState<string>('')
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {

    getCurrentWindow().open

    // 获取平台信息
    api.system.getPlatform().then(setPlatform)

    // 读取文件示例
    api.fs.readFile('test.txt').then(setFileContent).catch(console.error)
  }, [])

  const handleWriteFile = async () => {
    try {
      await api.fs.writeFile('test.txt', 'Hello from Tauri Bridge!')
      const content = await api.fs.readFile('test.txt')
      setFileContent(content)
    } catch (error) {
      console.error('Error writing file:', error)
    }
  }

  const handleMaximize = async () => {
    try {
      await api.window.maximize()
      setIsMaximized(true)
    } catch (error) {
      console.error('Error maximizing window:', error)
    }
  }

  const handleMinimize = async () => {
    try {
      await api.window.minimize()
    } catch (error) {
      console.error('Error minimizing window:', error)
    }
  }

  const handlePing = async () => {
    try {
      await ping()
    } catch (error) {
      console.error('Error pinging:', error)
    }
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <div className="row">
        <div>
          <p>Current Platform: {platform}</p>
          <div className="window-controls">
            <button onClick={handlePing}>ping</button>
            <button onClick={handleMinimize}>最小化</button>
            <button onClick={handleMaximize} disabled={isMaximized}>
              {isMaximized ? '已最大化' : '最大化'}
            </button>
          </div>
          <div className="file-controls">
            <button onClick={handleWriteFile}>Write Test File</button>
            <p>File Content: {fileContent}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
