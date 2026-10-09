"use strict";
// CS 315 Assignment 3 Starter Code
// Read this file carefully before adding your solution.
// The DOM type assertions ("as HTML...Element") are provided setup code.
const userSelect = document.getElementById("userSelect");
const postList = document.getElementById("postList");
const userMessage = document.getElementById("userMessage");
const postsMessageEl = document.getElementById("postMessage");
const resultBox = document.getElementById("resultBox");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
// Fetch users and fill the dropdown.
function loadUsers() {
    userMessage.className = "message";
    userMessage.textContent = "Loading users...";
    userSelect.innerHTML = '<option value="">-- Select a user --</option>';
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
        if (!response.ok) {
            throw new Error("User request failed.");
        }
        return response.json();
    })
        .then(function (data) {
        const users = data;
        users.forEach(function (user) {
            const option = document.createElement("option");
            option.value = String(user.id);
            option.textContent = user.name + " (" + user.email + ")";
            userSelect.appendChild(option);
        });
        userMessage.className = "message success";
        userMessage.textContent = users.length + " users loaded.";
    })
        .catch(function () {
        userMessage.className = "message error";
        userMessage.textContent = "Unable to load users.";
    });
}
// Fetch posts for one user and display them.
function loadPosts(userId) {
    postsMessageEl.className = "message";
    postsMessageEl.textContent = "Loading posts...";
    postList.innerHTML = "";
    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Post request failed.");
        }
        return response.json();
    })
        .then(function (data) {
        const posts = data;
        posts.forEach(function (post) {
            const postCard = document.createElement("article");
            const postTitle = document.createElement("h3");
            const postBody = document.createElement("p");
            postCard.className = "post-card";
            postTitle.textContent = post.title;
            postBody.textContent = post.body;
            postCard.appendChild(postTitle);
            postCard.appendChild(postBody);
            postList.appendChild(postCard);
        });
        postsMessageEl.className = "message success";
        postsMessageEl.textContent = posts.length + " posts loaded for this user.";
    })
        .catch(function () {
        postsMessageEl.className = "message error";
        postsMessageEl.textContent = "Unable to load posts.";
    });
}
// Validate the form before sending a post.
function submitNewPost(event) {
    event.preventDefault();
    resultBox.className = "result-box";
    const userId = Number(userSelect.value);
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (userId <= 0) {
        resultBox.className = "result-box error";
        resultBox.textContent = "Please select a user first.";
        return;
    }
    if (title.length === 0 || body.length === 0) {
        resultBox.className = "result-box error";
        resultBox.textContent = "Title and message are required.";
        return;
    }
    const newPost = {
        userId: userId,
        title: title,
        body: body
    };
    resultBox.className = "result-box";
    resultBox.textContent = "Submitting post...";
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Post submission failed.");
        }
        return response.json();
    })
        .then(function (data) {
        const returnedPost = data;
        const selectedUser = userSelect.options[userSelect.selectedIndex].textContent;
        resultBox.className = "result-box success";
        resultBox.innerHTML = "";
        const heading = document.createElement("strong");
        heading.textContent = "Post submitted successfully.";
        const idLine = document.createElement("p");
        idLine.textContent = "Returned ID: " + returnedPost.id;
        const userLine = document.createElement("p");
        userLine.textContent = "Selected user: " + (selectedUser || "Unknown user");
        const titleLine = document.createElement("p");
        titleLine.textContent = "Title: " + returnedPost.title;
        const bodyLine = document.createElement("p");
        bodyLine.textContent = "Message: " + returnedPost.body;
        resultBox.appendChild(heading);
        resultBox.appendChild(idLine);
        resultBox.appendChild(userLine);
        resultBox.appendChild(titleLine);
        resultBox.appendChild(bodyLine);
    })
        .catch(function () {
        resultBox.className = "result-box error";
        resultBox.textContent = "Unable to submit the post.";
    });
}
document.getElementById("loadUsersButton").addEventListener("click", loadUsers);
document.getElementById("loadPostsButton").addEventListener("click", function () {
    const userId = Number(userSelect.value);
    if (userId > 0) {
        loadPosts(userId);
    }
    else {
        postsMessageEl.textContent = "Please select a user first.";
    }
});
document.getElementById("postForm").addEventListener("submit", submitNewPost);
