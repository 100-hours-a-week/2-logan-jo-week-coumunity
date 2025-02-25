import { getCookie } from "./userMenu.js";

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  const userCookie = getCookie("user");
  const user = JSON.parse(userCookie);

  function formatLikes(likes) {
    if (likes >= 1000 && likes < 1000000) {
      return (likes / 1000).toFixed(0) + "k";
    } else if (likes >= 1000000) {
      return (likes / 1000000).toFixed(0) + "M";
    }
    return likes;
  }
  let post = null;

  try {
    const response = await fetch("../data/posts.json");
    const data = await response.json();
    post = data.posts.find((p) => p.id == postId);

    if (post) {
      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-author").textContent = post.author;
      document.getElementById("post-date").textContent = post.createdAt;
      document.getElementById("post-image").src = post.authorLogo;
      document.getElementById("post-content").textContent = post.content;
      document.getElementById("post-likes-count").textContent = `${formatLikes(
        post.likes
      )}`;
      document.getElementById("post-views").textContent = `${formatLikes(
        post.views
      )}`;
      document.getElementById("post-comments").textContent = `${formatLikes(
        post.comments
      )}`;
    } else {
      console.error("Post not found");
    }
  } catch (error) {
    console.error("Error loading post:", error);
  }

  try {
    const response = await fetch("../data/post/comments/comments.json");
    const data = await response.json();
    const comments = data.filter((comment) => comment.postId === postId);

    console.log(comments);

    const commentContainer = document.getElementById("comment-container");
    commentContainer.innerHTML = "";

    comments.map((comment) => {
      const commentItem = document.createElement("div");
      commentItem.className = "comment-item";
      commentItem.setAttribute("id", comment.id);

      commentItem.innerHTML = `
        <div class="comment-item-header">
          <img class="author-logo" src=${comment.author_image} alt="logo" />
          <span class="comment-item-author">${comment.author}</span>
          <span class="comment-item-date">${comment.createdAt}</span>
        </div>
        <div class="comment-item-content">
          <p id="comment-text-${comment.id}">${comment.content}</p>
        </div>
        ${
          comment.userId === user.id
            ? `
            <div class="comment-edit-container">
              <button id=${comment.id} class="comment-edit-button edit-button">
                수정
              </button>
              <button id=${comment.id} class="comment-delete-button edit-button">
                삭제
              </button>
            </div>
          `
            : ``
        }
      `;
      commentContainer.appendChild(commentItem);

      commentContainer.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("comment-delete-button")) {
          const commentId = target.getAttribute("id");
          console.log(`댓글 삭제: ${commentId}`);

          deleteModal.style.display = "flex";
          modalTitle.textContent = "댓글을 삭제하시겠습니까?";

          confirmDeleteButton.onclick = function () {
            console.log(`삭제된 댓글 ID: ${commentId}`);
            document.querySelector(`.comment-item[id="${commentId}"]`).remove();
            deleteModal.style.display = "none";
          };
        }
        if (target.classList.contains("comment-edit-button")) {
          const commentId = target.getAttribute("id");
          console.log(`댓글 수정: ${commentId}`);

          const commentText = document.getElementById(
            `comment-text-${commentId}`
          );

          commentArea.value = commentText.textContent;
          commentButton.textContent = "댓글 수정";
          commentButton.style.backgroundColor = "#aca0e8";
          commentButton.style.cursor = "pointer";

          commentButton.replaceWith(commentButton.cloneNode(true));
          commentButton = document.getElementById("comment-button");

          commentButton.onclick = function () {
            console.log(`수정된 댓글 ID: ${commentId}, ${commentArea.value}`);
            commentText.textContent = commentArea.value;
            commentArea.value = "";
            setCommentButtonDefault();
          };
        }
      });
    });
  } catch (error) {
    console.log("Error Comments:", error);
  }

  const deleteButton = document.getElementById("post-delete-button");
  const deleteModal = document.getElementById("delete-modal");
  const modalTitle = document.getElementById("delete-modal-title");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");
  const likesItems = document.getElementById("post-likes");
  const likesCount = document.getElementById("post-likes-count");
  const commentArea = document.getElementById("comment");
  let commentButton = document.getElementById("comment-button");

  let isLiked = false;
  let likes = parseInt(post.likes);

  likesItems.addEventListener("click", function () {
    if (isLiked) {
      isLiked = false;
      likes--;
      likesCount.textContent = `${formatLikes(likes)}`;
      likesItems.style.backgroundColor = "#d9d9d9";
      likesItems.style.color = "#000";
    } else {
      isLiked = true;
      likes++;
      likesCount.textContent = `${formatLikes(likes)}`;
      likesItems.style.backgroundColor = "#aca0e8";
      likesItems.style.color = "#fff";
    }
  });

  deleteButton.addEventListener("click", function () {
    deleteModal.style.display = "flex";
  });
  cancelDeleteButton.addEventListener("click", function () {
    deleteModal.style.display = "none";
  });
  confirmDeleteButton.addEventListener("click", function () {
    if (modalTitle.textContent.trim() === "게시글을 삭제하시겠습니까?") {
      console.log("게시글이 삭제되었습니다.");
      deleteModal.style.display = "none";
      window.location.href = "posts.html";
    } else {
      console.log("댓글이 삭제되었습니다.");
      deleteModal.style.display = "none";
      modalTitle.textContent = "게시글을 삭제하시겠습니까?";
      document.getElementById("first-comment").remove();
    }
  });

  setCommentButtonDefault();

  function setCommentButtonDefault() {
    commentButton.textContent = "댓글 등록";
    commentButton.style.backgroundColor = "#d9d9d9";
    commentButton.style.cursor = "not-allowed";

    commentButton.replaceWith(commentButton.cloneNode(true));
    commentButton = document.getElementById("comment-button");

    commentButton.onclick = function () {
      if (commentArea.value.trim() === "") return;

      console.log("새 댓글 등록: ", commentArea.value);
      commentArea.value = "";
      setCommentButtonDefault();
    };

    commentArea.oninput = function () {
      if (commentArea.value.trim()) {
        commentButton.style.backgroundColor = "#aca0e8";
        commentButton.style.cursor = "pointer";
      } else {
        commentButton.style.backgroundColor = "#d9d9d9";
        commentButton.style.cursor = "not-allowed";
      }
    };
  }
});
