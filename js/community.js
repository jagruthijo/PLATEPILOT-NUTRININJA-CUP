/**
 * PlatePilot - Student Community Recipe Board Controller
 * Enables students to share cheap hostel hacks, upvote posts, and filter community creations.
 */

const Community = {
  posts: [],
  activeTag: 'all',

  init() {
    this.posts = window.PlatePilotStorage.getCommunityPosts();
    this.renderPosts();
    this.initEventListeners();
  },

  initEventListeners() {
    // New post form submit
    const postForm = document.getElementById('new-post-form');
    if (postForm) {
      postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.createNewPost();
      });
    }

    // Modal open
    const openBtn = document.getElementById('btn-open-create-post');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        window.App.openModal('create-post-modal');
      });
    }

    // Modal close
    const closeBtn = document.getElementById('btn-close-post-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        window.App.closeModal('create-post-modal');
      });
    }
  },

  filterByTag(tag) {
    this.activeTag = tag;
    this.renderPosts();
  },

  renderPosts() {
    const container = document.getElementById('community-posts-container');
    if (!container) return;

    let filtered = this.posts;
    if (this.activeTag !== 'all') {
      filtered = filtered.filter(p => p.tag === this.activeTag);
    }

    container.innerHTML = filtered.map(post => `
      <div class="card card-hover" style="margin-bottom: 24px; border-radius: var(--radius-lg); overflow: hidden;">
        <!-- Author Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${post.avatar}" alt="${post.author}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">
            <div>
              <strong style="font-size: 0.95rem; color: var(--text-main); display: block;">${post.author}</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${post.date}</span>
            </div>
          </div>
          <span class="badge badge-lime">${post.tag}</span>
        </div>

        <!-- Post Image -->
        <div style="height: 220px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 16px; background: var(--bg-card-subtle);">
          <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <!-- Content -->
        <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${post.title}</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
          ${post.content}
        </p>

        <!-- Stats Bar & Actions -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-border); padding-top: 14px;">
          <div style="display: flex; gap: 16px; font-size: 0.88rem;">
            <span style="font-weight: 800; color: var(--color-primary-forest);">Cost: ₹${post.cost}</span>
            <span style="font-weight: 700; color: var(--color-success);">${post.protein}g Protein</span>
          </div>

          <button class="btn btn-sm ${post.likedByUser ? 'btn-primary' : 'btn-outline'}" 
                  onclick="Community.toggleLike('${post.id}')" style="border-radius: var(--radius-full);">
            <i data-lucide="thumbs-up" style="width: 14px; height: 14px;"></i>
            <span>${post.likes} Helpful</span>
          </button>
        </div>
      </div>
    `).join('');

    window.App.initLucideIcons();
  },

  toggleLike(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      if (post.likedByUser) {
        post.likes--;
        post.likedByUser = false;
      } else {
        post.likes++;
        post.likedByUser = true;
      }
      window.PlatePilotStorage.saveCommunityPosts(this.posts);
      this.renderPosts();
    }
  },

  createNewPost() {
    const titleInput = document.getElementById('post-title-input');
    const contentInput = document.getElementById('post-content-input');
    const costInput = document.getElementById('post-cost-input');
    const proteinInput = document.getElementById('post-protein-input');
    const tagSelect = document.getElementById('post-tag-select');
    const imageInput = document.getElementById('post-image-input');

    if (!titleInput || !titleInput.value.trim() || !contentInput.value.trim()) return;

    const profile = window.PlatePilotStorage.getProfile();

    const newPost = {
      id: 'post_' + Date.now(),
      author: `${profile.name || 'Student'} (${profile.college || 'Hostel'})`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
      image: imageInput && imageInput.value.trim() ? imageInput.value.trim() : 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
      cost: parseFloat(costInput ? costInput.value : 25) || 25,
      protein: parseFloat(proteinInput ? proteinInput.value : 15) || 15,
      likes: 1,
      likedByUser: true,
      date: 'Just now',
      tag: tagSelect ? tagSelect.value : 'Hostel Kettle'
    };

    this.posts.unshift(newPost);
    window.PlatePilotStorage.saveCommunityPosts(this.posts);
    this.renderPosts();

    window.App.closeModal('create-post-modal');
    window.App.showToast('Your recipe hack was posted to the student board!', 'success');
  }
};

window.Community = Community;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('community-posts-container')) {
    Community.init();
  }
});
