import { getCookie } from "../util/cookie.js";
import { formatLikes } from "../util/likes.js";
import { formatDate } from "../util/date.js";

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  const userCookie = getCookie("user");
  const user = JSON.parse(userCookie);

  let post = await fetchPost(postId);
  if (post) renderPost(post);

  let comments = await fetchComments(postId);
  renderComments(comments, user);

  setupEventListeners(postId, post.likes);
  setCommentButtonDefault();
});

const fetchPost = async (postId) => {
  try {
    const response = await fetch("../data/posts.json");
    const data = await response.json();
    return data.posts.find((p) => p.id === postId) || null;
  } catch (error) {
    console.error("Error loading post:", error);
    return null;
  }
};

const renderPost = (post) => {
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-author").textContent = post.author;
  document.getElementById("post-date").textContent = formatDate(post.createdAt);
  document.getElementById("post-image").src = post.authorLogo;
  document.getElementById("post-content").textContent = post.content;
  document.getElementById("post-likes-count").textContent = formatLikes(
    post.likes
  );
  document.getElementById("post-views").textContent = formatLikes(post.views);
  document.getElementById("post-comments").textContent = formatLikes(
    post.comments
  );
};

const fetchComments = async (postId) => {
  try {
    const response = await fetch("../data/post/comments/comments.json");
    const data = await response.json();
    return data.filter((comment) => comment.postId === postId);
  } catch (error) {
    console.error("Error loading comments:", error);
    return [];
  }
};

const renderComments = (comments, user) => {
  const commentContainer = document.getElementById("comment-container");
  commentContainer.innerHTML = comments
    .map((comment) => createCommentHTML(comment, user))
    .join("");
};

const createCommentHTML = (comment, user) => {
  return `
    <div class="comment-item" id="${comment.id}">
      <div class="comment-item-header">
        <img class="author-logo" src="${comment.author_image}" alt="logo" />
        <span class="comment-item-author">${comment.author}</span>
        <span class="comment-item-date">${formatDate(comment.createdAt)}</span>
      </div>
      <div class="comment-item-content">
        <p id="comment-text-${comment.id}">${comment.content}</p>
      </div>
      ${comment.userId === user.id ? createCommentControls(comment.id) : ""}
    </div>`;
};

const createCommentControls = (commentId) => {
  return `
    <div class="comment-edit-container">
      <button class="comment-edit-button" data-id="${commentId}">수정</button>
      <button class="comment-delete-button" data-id="${commentId}">삭제</button>
    </div>`;
};

const setupEventListeners = (postId, like) => {
  document.body.addEventListener("click", handleBodyClick);
  document
    .getElementById("post-edit-button")
    .addEventListener(
      "click",
      () => (window.location.href = `editPost.html?id=${postId}`)
    );
  document
    .getElementById("post-delete-button")
    .addEventListener("click", () => toggleModal("delete-modal", true));
  document
    .getElementById("cancel-delete")
    .addEventListener("click", () => toggleModal("delete-modal", false));
  document
    .getElementById("confirm-delete")
    .addEventListener("click", () => deletePost());
  setupLikeButton(like);
};

const handleBodyClick = (event) => {
  const target = event.target;
  if (target.classList.contains("comment-delete-button"))
    deleteComment(target.dataset.id);
  if (target.classList.contains("comment-edit-button"))
    editComment(target.dataset.id);
};

const deleteComment = (commentId) => {
  console.log(`댓글 삭제: ${commentId}`);
  document.getElementById(commentId)?.remove();
};

const editComment = (commentId) => {
  console.log(`댓글 수정: ${commentId}`);
  const commentText = document.getElementById(`comment-text-${commentId}`);
  const commentArea = document.getElementById("comment");
  const commentButton = document.getElementById("comment-button");

  commentArea.value = commentText.textContent;
  commentButton.textContent = "댓글 수정";
  commentButton.style.backgroundColor = "#aca0e8";
  commentButton.style.cursor = "pointer";

  commentButton.onclick = function () {
    commentText.textContent = commentArea.value;
    commentArea.value = "";
    setCommentButtonDefault();
  };
};

const toggleModal = (modalId, isVisible) => {
  document.getElementById(modalId).style.display = isVisible ? "flex" : "none";
};

const deletePost = () => {
  console.log("게시글이 삭제되었습니다.");
  toggleModal("delete-modal", false);
  window.location.href = "posts.html";
};

const setupLikeButton = (like) => {
  const likesItems = document.getElementById("post-likes");
  const likesCount = document.getElementById("post-likes-count");
  let isLiked = false;
  let likes = like;

  likesItems.addEventListener("click", function () {
    isLiked = !isLiked;
    likes += isLiked ? 1 : -1;
    likesCount.textContent = formatLikes(likes);
    likesItems.style.backgroundColor = isLiked ? "#aca0e8" : "#d9d9d9";
    likesItems.style.color = isLiked ? "#fff" : "#000";
  });
};

const setCommentButtonDefault = () => {
  const commentArea = document.getElementById("comment");
  const commentButton = document.getElementById("comment-button");

  commentButton.textContent = "댓글 등록";
  commentButton.style.backgroundColor = "#d9d9d9";
  commentButton.style.cursor = "not-allowed";

  commentArea.oninput = function () {
    commentButton.style.backgroundColor = commentArea.value.trim()
      ? "#aca0e8"
      : "#d9d9d9";
    commentButton.style.cursor = commentArea.value.trim()
      ? "pointer"
      : "not-allowed";
  };

  commentButton.onclick = function () {
    if (!commentArea.value.trim()) return;
    console.log("새 댓글 등록: ", commentArea.value);
    commentArea.value = "";
    setCommentButtonDefault();
  };
};
