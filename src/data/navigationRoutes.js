module.exports = {
  unorderedList: [
    {
      customer: [
        {
          name: "Dashboard",
          routeName: "ClientDashboard"
        },
        {
          name: "Transactions",
          routeName: "UserTransactions"
        }
      ],
      cashier: [
        {
          name: "Dashboard",
          routeName: "CashierDashboard"
        },
        {
          name: "Cash Transactions",
          routeName: "CashTransactions"
        }
      ],
      admin: [
        {
          name: "Dashboard",
          routeName: "AdminDashboard"
        },
        {
          name: "Add Staff",
          routeName: "NewStaff"
        },
        {
          name: "View Accounts",
          routeName: "ViewAccounts"
        }
      ]
    }
  ],
  navBrand: [
    {
      name: "admin",
      navRoute: "AdminDashboard"
    },
    {
      name: "cashier",
      navRoute: "CashierDashboard"
    },
    {
      name: "customer",
      navRoute: "ClientDashboard"
    },
    {
      name: "home",
      navRoute: "Home"
    }
  ]
};
