var userEmail = localStorage.getItem("user_email") || "guest";
var cartCount = 1;
var url = window.location.href;
var title = document.title;
var hostName = window.location.host;
var pageName = url.substring(url.lastIndexOf("/") + 1);
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var Day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var currDate = new Date();
var formStart = 1;
document.getElementById("readMore").addEventListener("click", (e) => {
  document.getElementById("description").textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
});

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
});

window.addEventListener("load", () => {
  adobeDataLayer.push({
    event: "aa-pageload",
    user: {
      email: userEmail,
    },
    page: {
      pageInfo: {
        pageName: title,
        pageUrl: url,
        referrer: document.referrer,
        hostName: hostName,
        language: "en-us",
        errorPage: false,
        pageType: title,
        pageId: title + " " + 123,
      },
    },
    timeStamp: {
      date: currDate.toDateString(),
      day: Day[currDate.getDay()],
      month: months[currDate.getMonth()],
      time:
        currDate.getHours() +
        ":" +
        currDate.getMinutes() +
        ":0" +
        currDate.getSeconds(),
      year: new Date().getFullYear(),
    },
    metric: "aa-pageload",
  });
});

document.querySelectorAll("button").forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (e.target.id != "submit" && e.target.id != "addToCart") {
      adobeDataLayer.push({
        link: {
          contentSection:
            e.target.id === "submit"
              ? "form"
              : e.target.id === "readMore"
              ? "description"
              : e.target.id === "addToCart"
              ? "productComponent"
              : "",
          contentSubsection: "",
          linkText: e.target.textContent,
          linkComponent:
            e.target.id === "submit"
              ? "form"
              : e.target.id === "readMore"
              ? "description"
              : e.target.id === "addToCart"
              ? "productComponent"
              : "",
          linkIndex: index + 1,
        },
        metric:
          e.target.id === "addToCart" ? "aa-action,aa-addtocart" : "aa-action",
        event: "aa-action",
        user: {
          email: userEmail,
        },
      });
    }
    if (e.target.id === "addToCart") {
      adobeDataLayer.push({
        link: {
          contentSection:
            e.target.id === "submit"
              ? "form"
              : e.target.id === "readMore"
              ? "description"
              : e.target.id === "addToCart"
              ? "productComponent"
              : "",
          contentSubsection: "addToCart",
          linkText: e.target.textContent,
          linkComponent:
            e.target.id === "submit"
              ? "form"
              : e.target.id === "readMore"
              ? "description"
              : e.target.id === "addToCart"
              ? "productComponent"
              : "",
          linkIndex: index + 1,
        },
        cart: {
          productName: "bat",
          price: "12.25",
          productId: "w3c1234",
          category: "ecommerce",
          quantity: cartCount,
        },
        metric:
          e.target.id === "addToCart" ? "aa-action,aa-addtocart" : "aa-action",
        event: "aa-action",
        user: {
          email: userEmail,
        },
      });
    }
  });
});

document.querySelectorAll("a").forEach((item, index) => {
  item.addEventListener("click", (e) => {
    adobeDataLayer.push({
      link: {
        contentSection: e.target.parentNode.getAttribute("id"),
        contentSubsection: "",
        linkText: e.target.textContent ? e.target.textContent : "banner",
        linkComponent: e.target.parentNode.getAttribute("id"),
        linkIndex: index + 1,
      },
      metric:
        e.target.parentNode.getAttribute("id") === "footer"
          ? "aa-link,aa-footer,aa-social"
          : "aa-link,aa-banner-clickout",
      event: "aa-link",
      user: {
        email: userEmail,
      },
    });
  });
});

document.getElementById("personalInfoForm").addEventListener("click", (e) => {
  e.preventDefault();
  if (formStart === 1 && e.target.id != "submit") {
    adobeDataLayer.push({
      journey: {
        serviceFlowName: e.target.parentNode.parentNode.getAttribute("id"),
        formCategory: "personal info",
        firstFieldInteracted: e.target.id,
      },
      page: {
        pageInfo: {
          pageName: title,
          pageUrl: url,
          referrer: document.referrer,
          hostName: hostName,
          pageId: title + " " + 123,
        },
      },
      metric: "aa-pi-start,aa-journey-start",
      event: "aa-journey-start",
      user: {
        email: userEmail,
      },
    });
    formStart++;
  }
});

document.getElementById("submit").addEventListener("click", (e) => {
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var mobile = document.getElementById("mobile");
  var region = document.getElementById("address");
  if (name === "" || email === "" || mobile === "" || region === "") {
    alert("field cannot be empty");
    return false;
  }
  adobeDataLayer.push({
    journey: {
      serviceFlowName: e.target.parentNode.getAttribute("id"),
      formCategory: "personal info",
      journeyIndex: "1",
      journeyLength: "1",
      region: region.value,
      name: name.value,
      email: email.value,
      mobile: mobile.value,
    },
    page: {
      pageInfo: {
        pageName: title,
        pageUrl: url,
        referrer: document.referrer,
        hostName: hostName,
        pageId: title + " " + 123,
      },
    },
    metric: "aa-pi-tracking,aa-journey-tracking",
    event: "aa-journey-tracking",
    user: {
      email: userEmail,
    },
  });
  var check = Math.floor(Math.random() * 10);
  console.log(check);

  if (check != 3) {
    adobeDataLayer.push({
      journey: {
        serviceFlowName: e.target.parentNode.getAttribute("id"),
        formCategory: "personal info",
        journeyIndex: "1",
        journeyLength: "1",
        region: region.value,
        name: name.value,
        email: email.value,
        mobile: mobile.value,
        successMessage: "form submit success",
        successId: Math.floor(Math.random() * Date.now()),
      },
      page: {
        pageInfo: {
          pageName: title,
          pageUrl: url,
          referrer: document.referrer,
          hostName: hostName,
          pageId: title + " " + 123,
        },
      },
      metric: "aa-pi-success,aa-journey-success",
      event: "aa-journey-success",
      user: {
        email: userEmail,
      },
    });
  } else {
    adobeDataLayer.push({
      journey: {
        serviceFlowName: e.target.parentNode.getAttribute("id"),
        formCategory: "personal info",
        journeyIndex: "1",
        journeyLength: "1",
        region: region.value,
        name: name.value,
        email: email.value,
        mobile: mobile.value,
        failureMessage: "form submit failed",
        failureId: Math.floor(Math.random() * Date.now()),
      },
      page: {
        pageInfo: {
          pageName: title,
          pageUrl: url,
          referrer: document.referrer,
          hostName: hostName,
          pageId: title + " " + 123,
        },
      },
      metric: "aa-pi-failure,aa-journey-failure",
      event: "aa-journey-failure",
      user: {
        email: userEmail,
      },
    });
  }
  name.value = "";
  region.value = "";
  mobile.value = "";
  email.value = "";
});
