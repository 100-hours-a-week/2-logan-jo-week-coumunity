document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

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
      document.getElementById("post-image").src = post.image;
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

  const deleteButton = document.getElementById("post-delete-button");
  const deleteModal = document.getElementById("delete-modal");
  const modalTitle = document.getElementById("delete-modal-title");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");
  const likesItems = document.getElementById("post-likes");
  const likesCount = document.getElementById("post-likes-count");
  const commentArea = document.getElementById("comment");
  const commentButton = document.getElementById("comment-button");
  const commentText = document.getElementById("comment-text");
  const commentEditButton = document.getElementById("comment-edit-button");
  const commentDeleteButton = document.getElementById("comment-delete-button");

  let isLiked = false;
  let likes = parseInt(post.likes);

  function checkComment() {
    if (commentArea.value.length === 0) {
      commentButton.style.cursor = "not-allowed";
      commentButton.style.backgroundColor = "#d9d9d9";
    } else {
      commentButton.style.cursor = "pointer";
      commentButton.style.backgroundColor = "#aca0e8";
    }
  }

  commentArea.addEventListener("input", checkComment);
  checkComment();

  commentButton.addEventListener("click", function () {
    if (commentButton.textContent === "댓글 등록") {
      console.log(commentArea.value);
      commentArea.value = "";
      commentButton.style.backgroundColor = "#d9d9d9";
      commentButton.disabled = true;
    } else {
      console.log("댓글이 수정되었습니다.");
      commentText.textContent = commentArea.value;
      commentArea.value = "";
      commentButton.style.backgroundColor = "#d9d9d9";
      commentButton.disabled = true;
    }
  });

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

  commentDeleteButton.addEventListener("click", function () {
    deleteModal.style.display = "flex";
    document.getElementById("delete-modal-title").textContent =
      "댓글을 삭제하시겠습니까?";
  });

  commentEditButton.addEventListener("click", function () {
    commentArea.textContent = commentText.textContent;
    commentButton.textContent = "댓글 수정";
    commentButton.style.backgroundColor = "#aca0e8";
    commentButton.style.cursor = "pointer";
  });
});
