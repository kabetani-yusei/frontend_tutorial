import { useEffect, useState } from 'react'
import rabbit from './assets/rabbit.webp'
import './App.css'

// 保存データは書き換えられている可能性があるので、形をチェックしてから使う
function loadPosts() {
  try {
    const data = JSON.parse(localStorage.getItem('posts'))
    if (!Array.isArray(data)) return []
    return data.filter(
      (post) => typeof post?.id === 'string' && typeof post?.text === 'string',
    )
  } catch {
    return []
  }
}

function App() {
  const [posts, setPosts] = useState(loadPosts)

  // posts が変わるたびにブラウザへ保存（再読み込みしても消えない）
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  // 投稿ボタンが押されたら呼ばれる。入力欄は React が自動で空にしてくれる
  function addPost(formData) {
    const text = formData.get('text').trim()
    if (!text) return
    setPosts((prev) => [{ id: crypto.randomUUID(), text }, ...prev])
  }

  function deletePost(id) {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  // Ctrl + Enter（Mac は ⌘ + Enter）でも投稿できるようにする
  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.form.requestSubmit()
    }
  }

  return (
    <main className="app">
      <header className="header">
        <img src={rabbit} alt="" width="64" height="64" />
        <h1>うさぎの投稿アプリ</h1>
      </header>

      <form className="post-form" action={addPost}>
        <label htmlFor="text">いまどうしてる？</label>
        <textarea
          id="text"
          name="text"
          placeholder="ここに入力"
          maxLength={140}
          required
          onKeyDown={handleKeyDown}
        />
        <button type="submit">投稿する</button>
      </form>

      {posts.length === 0 && <p className="empty">まだ投稿はありません</p>}

      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id} className="post">
            {/* {} で表示した文字は React が自動でエスケープするので XSS にならない */}
            <p>{post.text}</p>
            <button
              type="button"
              aria-label="削除"
              onClick={() => deletePost(post.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
