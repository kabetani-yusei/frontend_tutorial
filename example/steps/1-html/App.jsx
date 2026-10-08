import rabbit from './assets/rabbit.webp'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="header">
        <img src={rabbit} alt="" width="64" height="64" />
        <h1>うさぎの投稿アプリ</h1>
      </header>

      <form className="post-form">
        <label htmlFor="text">いまどうしてる？</label>
        <textarea id="text" name="text" placeholder="ここに入力" />
        <button type="submit">投稿する</button>
      </form>

      <ul className="posts">
        <li className="post">
          <p>はじめての投稿</p>
        </li>
      </ul>
    </main>
  )
}

export default App
