<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/admin">後台首頁</router-link>
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
            <router-link class="nav-link" to="/admin">後台首頁</router-link>
            <router-link class="nav-link" to="/admin/products">
              後台產品列表
            </router-link>
            <router-link class="nav-link" to="/admin/order">
              後台訂單管理
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <h2>這是後台頁面</h2>
    <router-view />
  </div>
</template>
