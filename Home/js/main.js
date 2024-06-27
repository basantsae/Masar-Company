function toggleMenu() {
    const navBars = document.getElementById('navBar');
    navBars.classList.toggle('active');
  }

//script for search section
// document.getElementById("all-btn").addEventListener("click", function() {
//   var div1 = document.getElementById("search-container-all");
//   var div2 = document.getElementById("search-container-rent");
//   var div3 = document.getElementById("search-container-sale");

//   div1.style.display = "flex";
//   div2.style.display = "none";
//   div3.style.display = "none";
// });

// document.getElementById("rent-btn").addEventListener("click", function() {
//   var div1 = document.getElementById("search-container-all");
//   var div2 = document.getElementById("search-container-rent");
//   var div3 = document.getElementById("search-container-sale");
  
//   div1.style.display = "none";
//   div2.style.display = "flex";
//   div3.style.display = "none";
// });

// document.getElementById("sales-btn").addEventListener("click", function() {
//   var div1 = document.getElementById("search-container-all");
//   var div2 = document.getElementById("search-container-rent");
//   var div3 = document.getElementById("search-container-sale");

//   div1.style.display = "none";
//   div2.style.display = "none";
//   div3.style.display = "flex";
// });

  // // Executes your code when the DOM is ready.  Acts the same as $(document).ready().
  // $(function() {

  //   // Calls the selectBoxIt method on your HTML select box
  //   var selectBox = $("select#test").selectBoxIt().data("selectBox-selectBoxIt");

  //   // Writes all of the current plugin options to the console
  //   console.log(selectBoxIt.options);

  // });
           

  //   //Executes your code when the DOM is ready.  Acts the same as $(document).ready().
  //   $(function() {

  //     // Calls the selectBoxIt method on your HTML select box
  //     $("select#test").selectBoxIt({ isMobile: function() {
  
  //       // Adapted from http://www.detectmobilebrowsers.com
  //       var ua = navigator.userAgent || navigator.vendor || window.opera;
  
  //       // Checks for iOs mobile devices
  //       return (/iPhone|iPod|iPad/).test(ua);
  
  //     }});
  
  //   });


  // -------------------scroll reveal----------
ScrollReveal(
  {
      reset:true,
      distance:'80px',
      duration:2000,
      delay:200
  }
)
ScrollReveal().reveal('.centered', {origin: 'left' });
// ScrollReveal().reveal('.centered' ,{origin: 'right' });
          