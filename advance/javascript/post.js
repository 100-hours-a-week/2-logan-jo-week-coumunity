document.addEventListener("DOMContentLoaded", async function () {
  function formatLikes(likes) {
    if (likes >= 1000 && likes < 1000000) {
      return (likes / 1000).toFixed(0) + "k";
    } else if (likes >= 1000000) {
      return (likes / 1000000).toFixed(0) + "M";
    }
    return likes;
  }

  try {
    const response = await fetch("../data/posts.json");
    const data = await response.json();
    const postsContainer = document.getElementById("posts-list");

    data.posts.map((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post-item";

      const date = new Date(post.createdAt);
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;

      postElement.innerHTML = `
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
                <span class="post-date">${formattedDate}</span>
              </div>
              <div class="post-line"></div>
              <div class="post-header-left">
                <img src="${post.authorLogo}" alt="profile" class="author-logo">
                <span class="author-name">${post.author}</span>
              </div>
            `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});
