// CS 315 Assignment 3 Starter Code
// Read this file carefully before adding your solution.
// The DOM type assertions ("as HTML...Element") are provided setup code.

interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface NewPost {
    userId: number;
    title: string;
    body: string;
}

const userSelect = document.getElementById("userSelect") as HTMLSelectElement;
const postList = document.getElementById("postList") as HTMLDivElement;
const userMessage = document.getElementById("userMessage") as HTMLParagraphElement;
const postsMessageEl = document.getElementById("postMessage") as HTMLParagraphElement;
const resultBox = document.getElementById("resultBox") as HTMLDivElement;
const titleInput = document.getElementById("titleInput") as HTMLInputElement;
const bodyInput = document.getElementById("bodyInput") as HTMLTextAreaElement;

// Fetch users and fill the dropdown.
function loadUsers(): void {
    userMessage.className = "message";
    userMessage.textContent = "Loading users...";
    userSelect.innerHTML = '<option value="">-- Select a user --</option>';

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response: Response) {
            if (!response.ok) {
                throw new Error("User request failed.");
            }
            return response.json();
        })
        .then(function (data: unknown) {
            const users: User[] = data as User[];

            users.forEach(function (user: User) {
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

// TODO 2: Fetch posts for the selected user and create DOM elements for them.
function loadPosts(userId: number): void {
    postsMessageEl.textContent = "TODO: Load posts for user " + userId;
}

// TODO 3: Validate the form, create a NewPost object, and POST it.
function submitNewPost(event: Event): void {
    event.preventDefault();
    resultBox.textContent = "TODO: Submit a new post here.";
}

document.getElementById("loadUsersButton")!.addEventListener("click", loadUsers);

document.getElementById("loadPostsButton")!.addEventListener("click", function () {
    const userId: number = Number(userSelect.value);

    if (userId > 0) {
        loadPosts(userId);
    } else {
        postsMessageEl.textContent = "Please select a user first.";
    }
});

document.getElementById("postForm")!.addEventListener("submit", submitNewPost);
