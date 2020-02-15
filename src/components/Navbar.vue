<template>
  <div class="navbar-fixed">
    <nav class="teal darken-3">
      <div class="nav-wrapper">
        <router-link
          :to="{
            name: moduleTypeRoute
          }"
        >
          <span href="#" class="banka-logo left-align">
            Banka
          </span>
        </router-link>
        <NavbarDesktop
          v-if="moduleType() !== 'home' && !mobileView"
          :moduleRoutes="moduleRoutes"
          :firstName="firstName"
          @logout="logout"
        />
        <NavbarMobile
          v-if="moduleType() !== 'home' && mobileView"
          :moduleRoutes="moduleRoutes"
          :showNav="showNav"
          @logout="logout"
        />
        <ul v-else-if="moduleType() === 'home'" id="nav-mobile" class="right">
          <li v-if="this.$route.path == '/signup' || this.$route.path == '/'">
            <router-link :to="{ name: 'Login' }">
              Login
            </router-link>
          </li>
          <li v-if="this.$route.path == '/login'">
            <router-link :to="{ name: 'Signup' }">
              Signup
            </router-link>
          </li>
        </ul>

        <ul class="right hide-on-med-and-up ham" v-if="moduleType() !== 'home'">
          <li>
            <i class="material-icons" @click="toggleNav">clear_all</i>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import navigationRoutes from "../data/navigationRoutes";
import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";

export default {
  name: "Navbar",
  components: {
    NavbarDesktop,
    NavbarMobile
  },
  data() {
    return {
      firstName: null,
      mobileView: true,
      showNav: false,
      navigationRoutes,
      moduleRoutes: null
    };
  },
  methods: {
    moduleType() {
      const firstName = sessionStorage.getItem("firstName");
      this.firstName = firstName;
      const type = sessionStorage.getItem("type");
      if (!["customer", "cashier", "admin"].includes(type)) {
        return "home";
      }
      if (type === "customer") {
        this.moduleRoutes = navigationRoutes.unorderedList[0].customer;
      } else if (type === "cashier") {
        this.moduleRoutes = navigationRoutes.unorderedList[0].cashier;
      } else {
        this.moduleRoutes = navigationRoutes.unorderedList[0].admin;
      }
      return type;
    },
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.firstName = null;
      this.$router.push({ name: "Home" });
    },
    handleView() {
      this.mobileView = window.innerWidth <= 602;
    },
    toggleNav() {
      this.showNav = !this.showNav;
    }
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  computed: {
    moduleTypeRoute() {
      return this.navigationRoutes.navBrand.find(
        route => route.name === this.moduleType()
      ).navRoute;
    }
  }
};
</script>
