let readCount = 0;
// Load all posts data
const loadPosts = async () => {
    console.log('load posts function');
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
    console.log('load posts function again');
}

// display all posts
const displayPosts = (posts) => {
    console.log('display posts function');
    const discussCardContainer = document.getElementById('discuss-card-container');

    posts.forEach(post => {
        // console.log(posts);
        // check active status
        let checkActive = `<div class="badge bg-red-500 badge-xs absolute right-4 top-3 border-2 check-active"></div>`
        if (post.isActive) {
            checkActive = `<div class="badge bg-green-500 badge-xs absolute right-4 top-3 border-2 check-active"></div>`
        }

        const discussCardDiv = document.createElement('div');
        discussCardDiv.classList = 'mb-4 bg-base-200 rounded-xl';
        discussCardDiv.innerHTML = `
        <div class="flex flex-col md:flex-row gap-5 items-center md:items-start">
            <div class="avatar h-1/2 p-2">
                <div class="w-24 rounded-full">
                    <img src="${post.image}" />
                </div>
                ${checkActive}
            </div>
            <div class="space-y-3 py-3 text-center md:text-start  w-full">
                <div class="flex gap-5 justify-center md:justify-start">
                    <div>
                        <p># <span>${post.category}</span></p>
                    </div>
                    <div>
                        <p>Author: <span>${post.author.name}</span></p>
                    </div>
                </div>
                <div class="border-b-2 border-dotted pb-3 space-y-1">
                    <h3 class="text-xl font-bold">${post.title}</h3>
                    <p>${post.description}</p>
                </div>
                <div class="flex justify-center md:justify-between gap-7 md:gap-0  ">
                    <div class="flex gap-5 justify-center md:justify-start">
                        <div class="flex gap-2 justify-center items-center">
                            <i class="fa-regular fa-message"></i>
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex gap-2 justify-center items-center">
                            <i class="fa-regular fa-eye"></i>
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex gap-2 justify-center items-center">
                            <i class="fa-regular fa-clock"></i>
                            <p>${post.posted_time} min</p>
                        </div>
                    </div>
                    <div class="mr-2">
                        <a><img onclick="handleMarkAsRead(${post.id})" src="images/email.png" alt="" class="cursor-pointer"></a>
                    </div>
                </div>
            </div>
        </div>
        `;
        discussCardContainer.appendChild(discussCardDiv);
    });
    console.log('display posts function again');
    toggleLoadingSpinner('post-loading-spinner', false);
    console.log('display posts function again again');
}
const handleMarkAsRead = async (postId) => {
    console.log('mark as read  function');
    toggleLoadingSpinner('mark-loading-spinner', true);
    readCount++;
    const readCountContainer = document.getElementById('read-count');
    readCountContainer.innerText = readCount;
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;

    const markAsReadContainer = document.getElementById('mark-as-read-container');

    posts.forEach(post => {
        if (post.id == postId) {
            const markAsReadDiv = document.createElement('div');
            markAsReadDiv.classList = 'flex justify-between bg-white rounded-lg p-4 m-2 gap-3';
            markAsReadDiv.innerHTML = `
        <div>
            <p class="font-bold">${post.title}</p>
        </div>
        <div class="flex justify-between items-center gap-1">
            <i class="fa-regular fa-eye"></i>
            <p>${post.view_count}</p>
        </div>
        `;
            markAsReadContainer.appendChild(markAsReadDiv);
        }
    });
    toggleLoadingSpinner('mark-loading-spinner', false);
}

loadPosts();

const toggleLoadingSpinner = (spinnerId, isLoading) => {
    console.log('loading spinner function');
    const loadingSpinner = document.getElementById(spinnerId);
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

toggleLoadingSpinner('post-loading-spinner', true);
