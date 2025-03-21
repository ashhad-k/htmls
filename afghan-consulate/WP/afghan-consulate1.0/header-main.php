<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="description" content="The Consulate General of Afghanistan in Dubai provides consular services including visa processing, passport services, and support to Afghan nationals residing in the UAE. Contact us for more information on consular services, business inquiries, and cultural exchanges." />
<meta name="keywords" content="Consulate General of Afghanistan Dubai, Afghan Consulate UAE, visa services, passport services, consular services, Afghan nationals in UAE, business inquiries, cultural exchange, Afghan embassy" />
<meta name="author" content="Consulate General of Afghanistan in Dubai" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<meta property="og:title" content="Consulate General of the IEA Dubai" />
<meta property="og:description" content="The Consulate General of Afghanistan in Dubai provides consular services including visa processing, passport services, and support to Afghan nationals residing in the UAE. Contact us for more information on consular services, business inquiries, and cultural exchanges." />
<meta property="og:image" content="https://afghanconsulate.ae/wp-content/themes/afghan-consulate1.0/assets/logo3.png" />
<meta property="og:url" content="https://www.afghanconsulate.ae/" />
    
<?php wp_head(); ?>
</head>
<body class="d-flex flex-column h-100 a1">
<!-- Navigation-->
<nav class="navbar navbar-expand-lg py-3 navbar-fixed-top " id="nav0">
  <div class="container"> <a class="navbar-brand" href="/"><img src="<?php echo get_template_directory_uri(); ?>/assets/afghan-consulate.svg" class="en" alt="Afghan Consulate"/>
	  <img src="<?php echo get_template_directory_uri(); ?>/assets/afghan-consulate-ps.svg" class="ps" alt="Afghan Consulate"/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
      
      <!--      ul li removed-->
      
      <?php
      wp_nav_menu( array(
        'theme_location' => 'top-menu',
        'menu_class' => 'top-menu navbar-nav lhs'
      ) );

      ?>
      <div class="d-grid  d-md-block gap-1  rhs">
        <?php
        //wp_nav_menu( array(
        //  'theme_location' => 'top-rhs-menu',
       //   'menu_class' => 'rhs2'
       // ) );

        ?>
        <a class="btn btn-outline-light rounded-pill b0" data-bs-toggle="modal" data-bs-target="#docModal"> <i class="bi bi-file-check"></i> Document Verification</a> 
        
        <!-- Modal -->
        <div id="docModal" class="modal modal-lg fade" tabindex="-1" aria-labelledby="docModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 id="docModalLabel" class="modal-title fs-5">Document verification</h1>
              </div>
              <div class="modal-body">
                <div class="data">
                  <input class="form-control" type="text" placeholder="Enter Document No" aria-label="Enter Document No" />
                  <button class="btn btn-primary" type="button">Verify</button>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-outline-dark" type="button" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown b1">
          <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"> <i class="bi bi-search text-white"></i> </button>
          <form class="dropdown-menu dropdown-menu-end p-4" action="<?php echo home_url(); ?>" id="search-form" method="get">
            <div class="mb-3"> 
              <!--         <input type="input" class="form-control" id="search" placeholder="Search..."> -->
              <input class="form-control" type="text" name="s" id="s" value="type your search" onblur="if(this.value=='')this.value='type your search'"
  			  onfocus="if(this.value=='type your search')this.value=''" />
              <input type="hidden" value="submit" />
            </div>
            <button type="submit" class="btn btn-primary" value="submit" / >
            Search
            </button>
          </form>
        </div>
        <a href="https://test.ashhad.com/user-login/" class="btn btn-light rounded-circle b2"> <i class="bi bi-person"></i> </a> </div>
    </div>
  </div>
</nav>
<!-- Header-->
<section class="s-hero">
  <?php
 // wp_nav_menu( array(
   // 'theme_location' => 'header-rhs-menu',
  //  'menu_class' => 'sticky-right d-none d-md-block'
  //) );

  ?>
  <div class="sticky-right d-none d-md-block">
    <?php get_template_part('/patterns/hero-rhs-items'); ?>
  </div>
  <!--    /sticky end-->
  <div id="carousel1" class="carousel slide  carousel-fade">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carousel1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carousel1" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carousel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carousel1" data-bs-slide-to="3" aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carousel1" data-bs-slide-to="4" aria-label="Slide 5"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="data">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1>Tourist Investment Opportunity</h1>
                <p class="lead">Investment opportunities in the tourism sector can be diverse and depend on the specific location.</p>
                  <div class="d-flex">
                     <a href="/info-hub/afghanistan/" class="btn  btn-secondary me-3"> Discover More</a> <a href="/services/passport-renewal/" class="btn  btn-primary">Passport Renewal</a> 
                  </div>
             
                
                </div>
            </div>
          </div>
        </div>
        <img src="<?php echo get_template_directory_uri(); ?>/assets/bg-hero1.webp" class="d-block w-100"  alt="...">
        <div class="carousel-caption d-none d-md-block"> <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="28" viewBox="0 0 36 28" fill="none">
            <path class="fill1" d="M6.92852 22.6188H15.8228C16.1521 22.6188 16.4189 22.352 16.4189 22.0227C16.4189 21.6933 16.1521 21.4265 15.8228 21.4265H6.92852C5.99259 21.4265 5.22953 20.6664 5.22953 19.7335V5.95691C5.22953 5.01652 5.9911 4.25193 6.92852 4.25193H13.4577H13.4606H13.4636H21.6517H21.6546H21.6576H28.1826C29.1185 4.25193 29.8816 5.01648 29.8816 5.95691V8.03146C29.8816 8.36083 30.1483 8.6276 30.4777 8.6276C30.8071 8.6276 31.0739 8.36083 31.0739 8.03146V5.95691C31.0739 4.35926 29.7773 3.05966 28.1826 3.05966H22.2509V2.24296C22.2509 1.00597 21.2449 0 20.0064 0H15.1076C13.8706 0 12.8631 1.00597 12.8631 2.24296V3.05966H6.92839C5.33371 3.05966 4.03711 4.35922 4.03711 5.95691V19.7335C4.03711 21.3237 5.33384 22.6188 6.92852 22.6188ZM14.0571 2.24292C14.0571 1.66319 14.528 1.19224 15.1092 1.19224H20.0081C20.5878 1.19224 21.0603 1.66319 21.0603 2.24292V3.05962H14.0584V2.24292H14.0571Z" fill="#F2BD01"/>
            <path class="fill1" d="M29.6328 20.6112C29.3258 21.1209 28.7833 21.4265 28.1812 21.4265H22.4819C22.1525 21.4265 21.8857 21.6932 21.8857 22.0226C21.8857 22.352 22.1525 22.6187 22.4819 22.6187H28.1812C29.2036 22.6187 30.1276 22.0986 30.6522 21.2283C30.8221 20.9466 30.7312 20.58 30.4495 20.4101C30.1679 20.2402 29.8012 20.3311 29.6313 20.6128L29.6328 20.6112Z" fill="#F2BD01"/>
            <path d="M24.0849 9.61971C23.9031 9.59885 23.7213 9.65995 23.5931 9.78961L22.5797 10.7971C22.4396 10.9372 22.377 11.1384 22.4157 11.3336C22.453 11.5288 22.5856 11.6928 22.7704 11.7687L27.0863 13.5855C26.7167 14.0058 26.3516 14.426 25.9924 14.8373L23.4036 14.891C23.2501 14.894 23.1026 14.9566 22.9938 15.0654L22.2039 15.8552C22.0608 15.9983 21.9997 16.207 22.0429 16.4052C22.0862 16.6034 22.2292 16.7658 22.42 16.8374L25.0549 17.8001L26.0177 20.441C26.0877 20.6318 26.2502 20.7733 26.4484 20.8181C26.4901 20.827 26.5348 20.833 26.578 20.833C26.733 20.833 26.8851 20.7719 26.9983 20.6601L27.7927 19.8702C27.903 19.7614 27.9656 19.6139 27.9686 19.4589L28.0162 16.8717C28.4305 16.514 28.8523 16.1459 29.2711 15.7763L31.0834 20.0894C31.1609 20.2727 31.3234 20.4054 31.5186 20.4441C31.7108 20.4814 31.915 20.4203 32.0551 20.2802L33.0685 19.2668C33.1982 19.1371 33.2608 18.9553 33.2384 18.7735L32.5186 12.8716C33.6528 11.8463 34.5693 11.0027 34.7466 10.8194C35.4859 10.0757 35.4859 8.86409 34.7437 8.11294C34.0238 7.39162 32.7525 7.39311 32.0342 8.11294C31.8732 8.27241 31.0327 9.18003 29.9805 10.3425L24.0847 9.62268L24.0849 9.61971ZM30.6576 11.3694C31.8617 10.037 32.7425 9.08912 32.8782 8.95353C33.1479 8.68378 33.6338 8.68527 33.8991 8.95204C34.1822 9.23669 34.1822 9.6972 33.9021 9.97739C33.8991 9.98037 33.8961 9.98336 33.8931 9.98634C33.7813 10.1026 32.9393 10.885 31.4907 12.192C31.3655 12.3053 31.2939 12.4707 31.2939 12.6391C31.2939 12.663 31.2954 12.6868 31.2984 12.7107L32.0197 18.6259L31.8394 18.8062L30.0495 14.5468C29.975 14.3695 29.82 14.2398 29.6322 14.1966C29.4444 14.1534 29.2476 14.2041 29.1046 14.3307C28.419 14.9373 27.7156 15.5543 27.0359 16.1385C26.9078 16.2488 26.8318 16.4098 26.8288 16.5796L26.7826 19.0611L26.0821 17.1326C26.0225 16.9641 25.8899 16.8315 25.7215 16.7719L23.8079 16.0759L26.2789 16.0252C26.4473 16.0223 26.6068 15.9477 26.717 15.8196C27.3012 15.1445 27.9138 14.4425 28.5248 13.757C28.653 13.6139 28.7037 13.4172 28.662 13.2294C28.6187 13.0416 28.4891 12.8866 28.3117 12.8106L24.0477 11.0162L24.2266 10.8404L30.1418 11.5632C30.3341 11.587 30.5263 11.514 30.656 11.3709L30.6576 11.3694Z" fill="#F2BD01"/>
            <path d="M5.15625 27.9986C8.1161 27.9986 12.1146 26.7542 16.5621 24.3339C17.5771 23.781 18.6039 23.1714 19.6144 22.5246C20.5324 21.9359 21.4207 21.3278 22.2553 20.7153C22.9379 20.2175 23.6324 19.684 24.3179 19.1296C24.5743 18.9224 24.613 18.5469 24.4059 18.2905C24.2002 18.0342 23.8231 17.994 23.5683 18.2026C22.8976 18.7451 22.2195 19.2667 21.5518 19.7526C20.7366 20.3502 19.8677 20.9448 18.9705 21.5201C17.9839 22.1535 16.9809 22.7482 15.9913 23.2862C9.28017 26.9375 3.40383 27.8614 1.69877 25.5336C0.648071 24.0954 1.24719 21.4409 3.34412 18.2487C3.52446 17.973 3.44845 17.6034 3.17273 17.423C2.89851 17.2442 2.5289 17.3187 2.34706 17.5944C-0.071771 21.2785 -0.644068 24.3486 0.737456 26.2383C1.60185 27.4202 3.13694 27.9999 5.15788 27.9999L5.15625 27.9986Z" fill="#F2BD01"/>
          </svg>
          </i>
          <p>Tourist Investment Opportunity</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="data">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1>Power &amp; Water Management</h1>
                <p class="lead">Investment opportunities in the tourism sector can be diverse and depend on the specific location.</p>
                  
              <div class="d-flex">
                     <a href="/info-hub/afghanistan/" class="btn  btn-secondary me-3"> Discover More</a> <a href="/services/passport-renewal/" class="btn  btn-primary">Passport Renewal</a> 
                  </div>
                </div>
            </div>
          </div>
        </div>
        <img src="<?php echo get_template_directory_uri(); ?>/assets/bg-hero2.webp" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block"> <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
            <path class ="fill1" d="M29.0584 5.67005L27.0777 11.9142H30.5708C30.9754 11.9142 31.3052 12.2427 31.3052 12.6486C31.3052 12.8172 31.2477 12.9733 31.1515 13.0969L21.6489 27.6672C21.4279 28.0056 20.9758 28.1018 20.6373 27.882C20.3713 27.7097 20.2552 27.3937 20.3239 27.1027L22.5044 17.3779H18.6966C18.292 17.3779 17.9623 17.0495 17.9623 16.6436C17.9623 16.5611 17.9773 16.4812 18.001 16.4075L21.2157 5.21907C21.3081 4.89687 21.6016 4.68704 21.92 4.68704H28.3666C28.7712 4.68704 29.1009 5.01548 29.1009 5.42138C29.1009 5.51005 29.0859 5.59372 29.0572 5.67115L29.0584 5.67005ZM4.4122 1.4675L6.89491 9.29168C7.0173 9.67757 6.8025 10.0897 6.4166 10.2121C6.34417 10.2346 6.26923 10.2458 6.19555 10.2458H2.08796L10.7149 23.4749L8.70803 14.5257C8.61936 14.1311 8.86663 13.7402 9.26004 13.6515C9.31374 13.639 9.36744 13.6328 9.41989 13.6328V13.6303H14.1806L10.6862 1.4664H4.41072L4.4122 1.4675ZM5.19273 8.77951L2.71999 0.984105C2.69127 0.906675 2.67628 0.820505 2.67628 0.734334C2.67628 0.329714 3.00472 0 3.41061 0H11.2383C11.558 0 11.8515 0.211058 11.9427 0.533271L15.8479 14.1294C15.8729 14.2031 15.8866 14.283 15.8866 14.3655C15.8866 14.7701 15.5582 15.0998 15.1523 15.0998H10.3317L13.0255 27.1026C13.0942 27.3935 12.978 27.7095 12.712 27.8818C12.3736 28.1016 11.9203 28.0055 11.7005 27.667L0.153609 9.962C0.0574481 9.83836 0 9.6835 0 9.51367C0 9.10905 0.328435 8.77934 0.734334 8.77934L5.19273 8.77951ZM25.3755 12.4286L27.3662 6.1544H22.4731L19.6706 15.9118H23.4186V15.9143C23.4723 15.9143 23.5247 15.9206 23.5784 15.9331C23.9731 16.0217 24.2203 16.4126 24.1317 16.8073L22.6343 23.4786L29.2171 13.3842H26.0725C26 13.3842 25.9251 13.3729 25.8514 13.3492C25.4643 13.2268 25.2507 12.8159 25.3731 12.4288L25.3755 12.4286Z" />
          </svg>
          </i>
          <p>Power &amp; Water Management</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="data">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1>Hands Made Carpet And Antique</h1>
                <p class="lead">Investment opportunities in the tourism sector can be diverse and depend on the specific location.</p>
                <div class="d-flex">
                     <a href="/info-hub/afghanistan/" class="btn  btn-secondary me-3"> Discover More</a> <a href="/services/passport-renewal/" class="btn  btn-primary">Passport Renewal</a> 
                  </div> </div>
            </div>
          </div>
        </div>
        <img src="<?php echo get_template_directory_uri(); ?>/assets/bg-carpet.webp" class="d-block w-100" alt="Hands Made Carpet And Antique">
        <div class="carousel-caption d-none d-md-block"> <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="28" viewBox="0 0 21 28" fill="none">
            <path class="fill1" fill-rule="evenodd" clip-rule="evenodd" d="M0.0699988 27.7683C0.0965507 27.8141 0.133964 27.8564 0.177414 27.8914C0.260689 27.959 0.366897 28 0.482759 28H19.7931C19.909 28 20.0152 27.959 20.0984 27.8914C20.1419 27.8552 20.1781 27.8129 20.2059 27.7683C20.2505 27.6947 20.2759 27.609 20.2759 27.5172V0.482759C20.2759 0.216035 20.0598 0 19.7931 0H0.482759C0.216035 0 0 0.216035 0 0.482759V27.5172C0 27.609 0.0265515 27.6947 0.0699988 27.7683ZM15.4481 22.265V27.0348H18.8539L17.1823 24.6934L15.4468 22.2651L15.4481 22.265ZM11.0769 27.0348H14.4826V22.265L11.0769 27.0348ZM5.79297 22.265V27.0348H9.19869L7.52713 24.6934L5.79161 22.2651L5.79297 22.265ZM1.42172 27.0348H4.82745V22.265L1.42172 27.0348ZM0.965505 20.9136V26.0115L4.82757 20.6046V15.5067L0.965505 20.9136ZM5.79309 15.5067V20.6046L7.91964 23.5832L9.65516 26.0115V20.9136L7.52861 17.935L5.79309 15.5067ZM15.4483 15.5067V20.6046L19.3103 26.0115V20.9136L17.1838 17.935L15.4483 15.5067ZM10.6207 20.9136V26.0115L14.4827 20.6046V15.5067L10.6207 20.9136ZM5.79309 8.74805V13.846L7.91964 16.8246L9.65516 19.2529V14.1549L7.52861 11.1763L5.79309 8.74805ZM0.965505 14.1549V19.2529L4.82757 13.846V8.74805L0.965505 14.1549ZM15.4483 8.74805V13.846L19.3103 19.2529V14.1549L17.1838 11.1763L15.4483 8.74805ZM10.6207 14.1549V19.2529L14.4827 13.846V8.74805L10.6207 14.1549ZM5.79309 1.98943V7.08736L7.91964 10.066L9.65516 12.4943V7.39633L7.52861 4.41771L5.79309 1.98943ZM0.965505 7.39633V12.4943L4.82757 7.08736V1.98943L0.965505 7.39633ZM15.4483 1.98943V7.08736L19.3103 12.4943V7.39633L17.1838 4.41771L15.4483 1.98943ZM10.6207 7.39633V12.4943L14.4827 7.08736V1.98943L10.6207 7.39633ZM7.91964 3.30748L9.65516 5.73576V0.96595H6.24943L7.921 3.30732L7.91964 3.30748ZM0.965443 5.73576L4.37117 0.96595H0.965443V5.73576ZM15.9045 0.96595L19.3103 5.73576V0.96595H15.9045ZM10.6206 5.73576L14.0263 0.96595H10.6206V5.73576Z" fill="#9095AA"/>
          </svg>
          </i>
          <p>Hands Made Carpet And Antique</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="data">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1>Minerals Investment opportunity</h1>
                <p class="lead">Investment opportunities in the tourism sector can be diverse and depend on the specific location.</p>
               <div class="d-flex">
                     <a href="/info-hub/afghanistan/" class="btn  btn-secondary me-3"> Discover More</a> <a href="/services/passport-renewal/" class="btn  btn-primary">Passport Renewal</a> 
                  </div></div>
            </div>
          </div>
        </div>
        <img src="<?php echo get_template_directory_uri(); ?>/assets/bg-hero4.webp" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block"> <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="28" viewBox="0 0 35 28" fill="none" class="fill1">
            <path class="fill1" d="M24.5528 15.3427C24.1778 15.3427 23.874 15.6465 23.874 16.0215C23.874 16.3966 24.1778 16.7003 24.5528 16.7003C24.9278 16.7003 25.2316 16.3966 25.2316 16.0215C25.2316 15.6465 24.9278 15.3427 24.5528 15.3427Z" fill="#9095AA"/>
            <path class="fill1" d="M15.3819 16.8067C15.0068 16.8067 14.7031 17.1104 14.7031 17.4855C14.7031 17.8605 15.0068 18.1643 15.3819 18.1643C15.7569 18.1643 16.0607 17.8605 16.0607 17.4855C16.0607 17.1104 15.7569 16.8067 15.3819 16.8067Z" fill="#9095AA"/>
            <path class="fill1" d="M21.4129 20.8959C21.0378 20.8959 20.7341 21.1996 20.7341 21.5747C20.7341 21.9497 21.0378 22.2535 21.4129 22.2535C21.7879 22.2535 22.0917 21.9497 22.0917 21.5747C22.0923 21.1996 21.7879 20.8959 21.4129 20.8959Z" fill="#9095AA"/>
            <path class="fill1" d="M19.9554 26.6424C19.5803 26.6424 19.2765 26.9461 19.2765 27.3212C19.2765 27.6962 19.5803 28 19.9554 28C20.3304 28 20.6342 27.6962 20.6342 27.3212C20.6342 26.9467 20.3304 26.6424 19.9554 26.6424Z" fill="#9095AA"/>
            <path class="fill1" d="M30.4243 18.9973C30.0493 18.9973 29.7455 19.3011 29.7455 19.6761C29.7455 20.0512 30.0493 20.3549 30.4243 20.3549C30.7994 20.3549 31.1031 20.0512 31.1031 19.6761C31.1031 19.3011 30.7994 18.9973 30.4243 18.9973Z" fill="#9095AA"/>
            <path class="fill1" d="M13.6293 24.4009C13.2543 24.4009 12.9505 24.7047 12.9505 25.0797C12.9505 25.4548 13.2543 25.7585 13.6293 25.7585C14.0044 25.7585 14.3082 25.4548 14.3082 25.0797C14.3082 24.7047 14.0044 24.4009 13.6293 24.4009Z" fill="#9095AA"/>
            <path class="fill1" d="M4.37721 21.5799C4.00217 21.5799 3.6984 21.8837 3.6984 22.2587C3.6984 22.6338 4.00217 22.9376 4.37721 22.9376C4.75225 22.9376 5.05602 22.6338 5.05602 22.2587C5.05602 21.8837 4.75225 21.5799 4.37721 21.5799Z" fill="#9095AA"/>
            <path class="fill1" d="M8.17667 16.8067C7.80163 16.8067 7.49786 17.1104 7.49786 17.4855C7.49786 17.8605 7.80163 18.1643 8.17667 18.1643C8.55171 18.1643 8.85548 17.8605 8.85548 17.4855C8.85606 17.1104 8.55171 16.8067 8.17667 16.8067Z" fill="#9095AA"/>
            <path class="fill1" d="M29.9085 11.8161C30.3263 11.8161 30.665 11.4774 30.665 11.0596C30.665 10.6418 30.3263 10.3031 29.9085 10.3031C29.4907 10.3031 29.152 10.6418 29.152 11.0596C29.152 11.4774 29.4907 11.8161 29.9085 11.8161Z" fill="#9095AA"/>
            <path class="fill1" d="M18.5171 11.9621C18.9349 11.9621 19.2736 11.6234 19.2736 11.2056C19.2736 10.7878 18.9349 10.4491 18.5171 10.4491C18.0993 10.4491 17.7606 10.7878 17.7606 11.2056C17.7606 11.6234 18.0993 11.9621 18.5171 11.9621Z" fill="#9095AA"/>
            <path class="fill1" d="M12.666 10.5595C13.1697 10.5595 13.5779 10.1512 13.5779 9.64762C13.5779 9.14399 13.1697 8.73572 12.666 8.73572C12.1624 8.73572 11.7541 9.14399 11.7541 9.64762C11.7541 10.1512 12.1624 10.5595 12.666 10.5595Z" fill="#9095AA"/>
            <path class="fill1" d="M23.4277 10.0419C24.0168 10.0419 24.4944 9.56436 24.4944 8.97523C24.4944 8.38611 24.0168 7.90853 23.4277 7.90853C22.8386 7.90853 22.361 8.38611 22.361 8.97523C22.361 9.56436 22.8386 10.0419 23.4277 10.0419Z" fill="#9095AA"/>
            <path class="fill1" d="M5.9352 8.5371C5.34635 8.5371 4.8685 9.01437 4.8685 9.6038C4.8685 10.1932 5.34577 10.6705 5.9352 10.6705C6.52404 10.6705 7.0019 10.1932 7.0019 9.6038C7.0019 9.01437 6.52404 8.5371 5.9352 8.5371Z" fill="#9095AA"/>
            <path class="fill1" d="M8.98633 5.94688C7.45288 5.94688 6.75246 4.66521 6.1899 3.63531C5.71438 2.76431 5.39192 2.23563 4.93159 2.23563C3.81932 2.23563 3.22989 2.10185 2.70939 1.98327C2.21694 1.87111 1.79166 1.77472 0.87626 1.77472C0.39198 1.77472 0 1.38274 0 0.898458C0 0.414179 0.39198 0.0221986 0.87626 0.0221986C1.98853 0.0221986 2.57796 0.155974 3.09787 0.274561C3.59033 0.386722 4.01561 0.483111 4.93159 0.483111C6.46504 0.483111 7.16547 1.76479 7.72803 2.79468C8.20354 3.66569 8.52601 4.19436 8.98633 4.19436C9.76445 4.19436 10.1039 3.99691 10.5735 3.72352C11.1162 3.40807 11.7915 3.0155 13.0417 3.0155C13.5394 3.0155 13.8069 2.69129 14.3426 1.89506C14.8801 1.09532 15.6173 0 17.0976 0C18.2466 0 18.8536 0.192193 19.3887 0.361603C19.8631 0.511735 20.2737 0.641422 21.1517 0.641422C22.5012 0.641422 23.2314 1.29511 23.7647 1.77238C24.2257 2.18481 24.53 2.45703 25.21 2.45703C26.4566 2.45703 27.1313 2.84083 27.6729 3.14928C28.1455 3.418 28.4872 3.61194 29.27 3.61194C30.1918 3.61194 30.641 3.51497 31.116 3.41332C31.6347 3.30175 32.2224 3.17498 33.33 3.17498C33.8137 3.17498 34.2063 3.56696 34.2063 4.05124C34.2063 4.53552 33.8137 4.9275 33.33 4.9275C32.4088 4.9275 31.9595 5.02447 31.4846 5.12612C30.9658 5.23769 30.3782 5.36446 29.27 5.36446C28.0228 5.36446 27.3486 4.98066 26.8059 4.67222C26.3339 4.40408 25.9928 4.20955 25.21 4.20955C23.86 4.20955 23.1297 3.55586 22.5964 3.07801C22.1355 2.66617 21.8311 2.39394 21.1517 2.39394C20.0027 2.39394 19.3957 2.20175 18.8606 2.03234C18.3863 1.88221 17.9756 1.75252 17.0976 1.75252C16.5999 1.75252 16.3323 2.07673 15.7966 2.87296C15.2592 3.6727 14.522 4.76802 13.0417 4.76802C12.2641 4.76802 11.9247 4.96547 11.4545 5.23886C10.9118 5.55432 10.2365 5.94688 8.98633 5.94688Z" fill="#9095AA"/>
          </svg>
          </i>
          <p>Minerals Investment opportunity</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="data">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h1>Agricultural Investment opportunity</h1>
                <p class="lead">Investment opportunities in the tourism sector can be diverse and depend on the specific location.</p>
                <div class="d-flex">
                     <a href="/info-hub/afghanistan/" class="btn  btn-secondary me-3"> Discover More</a> <a href="/services/passport-renewal/" class="btn  btn-primary">Passport Renewal</a> 
                  </div> </div>
            </div>
          </div>
        </div>
        <img src="<?php echo get_template_directory_uri(); ?>/assets/bg-hero5.webp" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block"> <i>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28" fill="none" class="fill1">
            <path class="fill1" fill-rule="evenodd" clip-rule="evenodd" d="M12.5074 6.8066C13.1441 6.54068 13.8421 6.39366 14.5747 6.39366H15.0861C15.6512 6.39366 16.1089 6.85134 16.1089 7.41645V8.95063C16.1089 10.2061 15.678 11.3606 14.957 12.2746C15.5566 12.2746 16.1089 12.6415 16.1089 13.2974V14.5759C16.1089 17.542 13.7053 19.9454 10.7393 19.9454V21.3518H15.0861C17.7696 21.3518 19.9444 23.5277 19.9444 26.2101C19.9444 27.1984 19.1428 28 18.1545 28H1.7899C0.801637 28 0 27.1984 0 26.2101C0 23.5278 2.1747 21.3518 4.85833 21.3518H9.2051V19.9454C6.23901 19.9454 3.83554 17.5419 3.83554 14.5759V13.2974C3.83554 12.6415 4.38785 12.2746 4.98745 12.2746C4.26639 11.3605 3.83554 10.206 3.83554 8.95063V7.41645C3.83554 6.85134 4.29323 6.39366 4.85833 6.39366H5.36972C6.1023 6.39366 6.80035 6.54068 7.43703 6.8066C6.83999 4.58586 7.41274 2.11585 9.15532 0.372033C9.65264 -0.124011 10.2919 -0.124011 10.7892 0.372033C12.5318 2.11588 13.1044 4.58592 12.5074 6.8066ZM9.97087 22.8862H4.85823C3.02232 22.8862 1.53425 24.3743 1.53425 26.2101C1.53425 26.352 1.64931 26.4658 1.78995 26.4658H18.1546C18.2952 26.4658 18.4103 26.352 18.4103 26.2101C18.4103 24.3742 16.9221 22.8862 15.0863 22.8862H9.97365H9.97237H9.97087ZM14.5746 14.5759C14.5746 16.6943 12.8576 18.4114 10.739 18.4114V17.6443C10.739 15.5258 12.456 13.8088 14.5746 13.8088V14.5759ZM14.5746 8.95037C14.5746 11.0688 12.8576 12.7859 10.739 12.7859V11.7631C10.739 9.64465 12.456 7.92758 14.5746 7.92758V8.95037ZM5.36946 7.92758C7.48793 7.92758 9.205 9.64459 9.205 11.7631V12.7859C7.08654 12.7859 5.36946 11.0689 5.36946 8.95037V7.92758ZM5.36946 13.8087C7.48793 13.8087 9.205 15.5257 9.205 17.6442V18.4113C7.08654 18.4113 5.36946 16.6943 5.36946 14.5758V13.8087ZM9.97185 1.74633C11.6109 3.65638 11.6109 6.48946 9.97185 8.39954C8.33283 6.48949 8.33283 3.65641 9.97185 1.74633Z" fill="none"/>
          </svg>
          </i>
          <p>Agricultural Investment opportunity</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="visually-hidden">Previous</span> </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="visually-hidden">Next</span> </button>
  </div>
</section>
