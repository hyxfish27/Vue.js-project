<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">女孩 X 雜貨</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link" to="/about">
              關於我們
            </router-link>
            <router-link class="nav-link" to="/products">
              前台產品頁面
            </router-link>
            <router-link class="nav-link" to="/cart"> 前台購物車 </router-link>
            <router-link
              class="nav-link btn btn-primary text-white"
              to="/login"
            >
              登入
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <h2 class="text-center mt-4">這裡是前台</h2>
    <router-view />
  </div>
</template>
