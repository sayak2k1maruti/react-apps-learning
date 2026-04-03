import { useState } from "react";
const articles = [
  {
    title: "Article Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
  },
  {
    title: "Another Article Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
  },
  {
    title: "Yet Another Article Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
  },
];
export default function App() {
  return (
    <div className="app">
      <Articles content={articles} />
    </div>
  );
}

function Articles({ content }) {
  const [articleIndex, setArticleIndex] = useState(0);
  function handleTabClick(index) {
    setArticleIndex(index);
  }
  return (
    <div className="app">
      <ul className="tabs">
        {content.map((article, index) => (
          <li
            className={articleIndex === index ? "active" : ""}
            onClick={() => handleTabClick(index)}
          >
            {article?.title}
          </li>
        ))}
      </ul>
      <div>
        <Article key={articleIndex} article={content[articleIndex]} />
        <Article article={content[articleIndex]} />
      </div>
    </div>
  );
}

function Article({ article }) {
  const [likeCount, setLikeCount] = useState(0);
  function handleLikeClicked() {
    setLikeCount((likeCount) => likeCount + 1);
  }
  return (
    <div className="article">
      <h2>{article?.title}</h2>
      <p>{article?.content}</p>
      <div className="like-container">
        <button onClick={handleLikeClicked}>❤️</button>
        <span className="like-count">{likeCount}</span>
      </div>
    </div>
  );
}
