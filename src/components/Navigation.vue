<template>
  <div class="nav-container">
    <span class="nav-toggle" @click="toggleNav">Menu</span>
    
    <transition name="fade">      
      <div class="nav-wrap" v-show="showNav">
        <div class="nav">  
          <a @click="nav" data-where="home">Home</a>
          <a @click="nav" data-where="walkthrough">Walkthrough</a>
          <a @click="nav" data-where="detecting">Detector</a>
          <a @click="nav" data-where="locations">Locations</a>
          <a @click="nav" data-where="about">About</a>
          <button type="button" @click="toggleNav">Close Menu</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
        showNav: false,
        navigators: null
      }
    },
    mounted() {
      const navElems = document.querySelector('.nav').getElementsByTagName('a');
      const where = this.$router.history.current.name;
      
      // this transforms a NodeList into an Array we can iterate over
      this.navigators = [].slice.call(navElems);
      this.clearActiveClass();
      this.addActiveClass(where);
    },
    methods: {
      toggleNav() {
        this.showNav = !this.showNav
      },
      nav(event) {
        const where = event.srcElement.getAttribute('data-where');
        this.$router.push({name: where}, () => {
          this.showNav = false;
          this.clearActiveClass();
          event.srcElement.classList.add('active');
        });
      },
      clearActiveClass() {
        this.navigators.forEach((nav) => {
          nav.classList.remove('active');
        });
      },
      addActiveClass(where) {
        this.navigators.forEach((nav) => {
          if (nav.getAttribute('data-where') === where) {
            nav.classList.add('active');
          }
        });
      }
    }
  }
</script>

<style>
  .nav-container {}

  .nav-toggle {
    text-decoration: underline;
  }

  .nav-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: var(--dark-op);
    z-index: 1000;
  }

  .fade-enter-active, 
  .fade-leave-active {
    transition: opacity .2s ease-in-out;
  }

  .fade-enter, 
  .fade-leave-to{
    opacity: 0;
  }

  .nav {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .nav a {
    margin: 0 auto 20px;
    color: var(--text-inv);
  }

  .nav a.active {
    color: var(--pop);
  }
</style>