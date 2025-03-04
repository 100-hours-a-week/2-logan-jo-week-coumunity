import { formatLikes } from "../util/likes.js";
import { formatDate } from "../util/date.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("../data/posts.json");
    const data = await response.json();
    const postsContainer = document.getElementById("posts-list");

    data.posts.map((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post-item";

      postElement.innerHTML = `
            <a href="post.html?id=${post.id}">
              <div class="post-header">
                <h3 class="post-title">${
                  post.title.length > 26
                    ? post.title.slice(0, 26) + "..."
                    : post.title
                }</h3>
              </div>
              <div class="post-header">
                <div class="post-header-left">
                  <div class="post-stats">
                    <span>좋아요 ${formatLikes(post.likes)}</span>
                    <span>댓글 ${formatLikes(post.comments)}</span>
                    <span>조회수 ${formatLikes(post.views)}</span>
                  </div>
                </div>
                <span class="post-date">${formatDate(post.createdAt)}</span>
              </div>
              <div class="post-line"></div>
              <div class="post-header-left">
                <img src="${post.authorLogo}" alt="profile" class="author-logo">
                <span class="author-name">${post.author}</span>
              </div>
            </a>
            `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});
