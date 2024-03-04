let readCount = 0;
// Load all posts data
const loadPosts = async () => {
    // console.log('load posts function');
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
    // console.log('load posts function again');
}

// Load searched post data
const loadSearchedPost = async (searchText) => {
    // console.log(searchText);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    // console.log(data);
    const posts = data.posts;
    setTimeout(() => {
        displayPosts(posts);
    }, 2000);
    // displayPosts(posts);
    // console.log(posts);
}

// display all posts
const displayPosts = (posts) => {
    // console.log('display posts function');
    const discussCardContainer = document.getElementById('discuss-card-container');
    // Clear previous posts data
    discussCardContainer.textContent = '';
    // console.log(posts.length);
    if (posts.length === 0) {
        // console.log(posts.length);
        const discussCardDiv = document.createElement('div');
        discussCardDiv.classList = 'mt-7';
        discussCardDiv.innerHTML = `
        <h1 class="text-xl font-bold text-center">Sorry ! No Data Found. Please, Search Again.</h1>
        `
        discussCardContainer.appendChild(discussCardDiv);
    }
    else {
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
    }

    // console.log('display posts function again');
    toggleLoadingSpinner('post-loading-spinner', false);
    // console.log('display posts function again again');
    toggleLoadingSpinner('search-loading-spinner', false);
}

// Load latest posts data
const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data[0]);
    displayLatestPost(data);
}

// Display Latest Posts
const displayLatestPost = (latestPost) => {
    const latestCardContainer = document.getElementById('latest-card-container');
    latestPost.forEach(post => {
        // console.log(post);
        const latestDiv = document.createElement('div');
        latestDiv.classList = 'w-full lg:w-1/3 border-2 rounded-2xl'
        latestDiv.innerHTML = `
        <div class="bg-base-200 rounded-2xl m-5">
        <img class="rounded-2xl" src="${post.cover_image}" alt="">
    </div>

    <div class="rounded-2xl m-5 space-y-3">
        <div class="flex items-center gap-2">
            <i class="fa-regular fa-calendar"></i>
            <p>${post.author?.posted_date || 'No publish date'
            }</p>
        </div>
        <div class="space-y-1">
            <h3 class="text-xl font-bold">${post.title}</h3>
            <p class="text-sm">${post.description}</p>
        </div>
        <div class="flex items-center gap-3">
            <div class=" w-1/6">
                <div class="avatar">
                    <div class="w-full rounded-full">
                        <img
                            src="${post.profile_image}" />
                    </div>
                </div>
            </div>
            <div class=" w-3/5">
                <h5 class="font-bold">${post.author.name}</h5>
                <p class="text-sm">${post.author?.designation || 'Unknown'}</p>
            </div>
        </div>
    </div>
        `;
        latestCardContainer.appendChild(latestDiv);
    })
    toggleLoadingSpinner('latest-loading-spinner', false);
}

// Handle mark as read click event
const handleMarkAsRead = async (postId) => {
    // console.log('mark as read  function');
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

// handle searching
const handleSearch = () => {
    toggleLoadingSpinner('search-loading-spinner', true);
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    // console.log(searchText);
    loadSearchedPost(searchText);
    searchBox.value = '';
}

loadPosts();
loadLatestPosts();

// Toggle loading spinner
const toggleLoadingSpinner = (spinnerId, isLoading) => {
    // console.log('loading spinner function');
    const loadingSpinner = document.getElementById(spinnerId);
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

toggleLoadingSpinner('post-loading-spinner', true);
toggleLoadingSpinner('latest-loading-spinner', true);
