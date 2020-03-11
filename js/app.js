var app = angular.module('devechron', ['ngRoute','ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider
    .when("/", 
    {
        title: 'MV Dev',
        templateUrl : "/jezici/rs.html"
    })
    .when("/en", 
    {
        title: 'MV Dev',
        templateUrl : "/jezici/en.html"
    })
    .otherwise({
        redirectTo: '/'
    });
   
}]);

app.controller('glavniCtrl', function($scope,$timeout,$uibModal,$window,$http){
    document.addEventListener("wheel", function (e) { e.ctrlKey ? e.preventDefault() : ''}, {passive: false});

    if('serviceWorker' in navigator) {
        window.addEventListener('load',()=>{
            navigator.serviceWorker
                .register('../sw_cached_site.js');
        }, {passive: false});
    }

    $scope.komplet = [
                {lnk:"nasamalapraksa.jpg",gryscl:1,pblc:1,naslov:'Naša mala praksa',platforma:'AngularJS, PHP, Bootstrap',tema:'medicina',vrsta:'blog',hasAdr:true,adr:'http://www.nasamalapraksa.com'},
                {lnk:"chatroom.jpg",gryscl:1,pblc:1,naslov:'Chat Horizon',platforma:'AngularJS, Bootstrap',tema:'drustvene mreze',vrsta:'web app',hasAdr:false,mod:'chatHorizon'}, 
                {lnk:"ozeblin.jpg",gryscl:1,pblc:1,naslov:'Ozeblin',platforma:'AngularJS, Bootstrap',tema:'gradjevina',vrsta:'prezentacija',hasAdr:true,adr:'http://www.ozeblin.rs'}, 
                {lnk:"dzmodrica.jpg",gryscl:1,pblc:1,naslov:'DZ Modriča',platforma:'AngularJS, PHP, Bootstrap',tema:'medicina',vrsta:'web app',hasAdr:true,adr:'http://www.dzmodrica.com'}, 
                {lnk:"haljina.jpg",gryscl:1,pblc:1,naslov:'Haljina na dan',platforma:'AngularJS, PHP, Bootstrap',tema:'moda',vrsta:'web app',hasAdr:false,mod:'haljina'}, 
                {lnk:"xbox.jpg",gryscl:1,pblc:1,naslov:'XBox Controllers',platforma:'AngularJS, Bootstrap',tema:'tehnika',vrsta:'prezentacija',hasAdr:false,mod:'xbox'}, 
                {lnk:"germeda.jpg",gryscl:1,pblc:1,naslov:'Germeda Pflegedienst',platforma:'AngularJS, PHP, Bootstrap',tema:'medicina',vrsta:'web app',hasAdr:true,adr:'http://germedaneu.mastermedi-1.vautronserver.de/'}, 
                {lnk:"blue-drone-hover.jpg",gryscl:1,pblc:1,naslov:'Blue star drone',platforma:'AngularJS, Bootstrap',tema:'tehnika',vrsta:'prezentacija',hasAdr:false,mod:'blueDrone'},
                {lnk:"iBooked.jpg",gryscl:1,pblc:1,naslov:'iBooked',platforma:'AngularJS, Bootstrap',tema:'avantura',vrsta:'prezentacija',hasAdr:false,mod:'ibooked'}
            ];
    
    $scope.listajDesno = function() {
        var odseci = 5;
        if($window.innerWidth < 900) {
            odseci = 1;
        } else if($window.innerWidth >= 900 && $window.innerWidth <= 1000) {
            odseci = 2;
        } else if($window.innerWidth >= 1100 && $window.innerWidth <= 1400) {
            odseci = 3;
        }
        $scope.nestani = true;
        $timeout(function() {
            $scope.komplet.push.apply($scope.komplet,$scope.komplet.splice(0,odseci));
            var arr = $scope.komplet.map(x=>x);
            $scope.komplet = [];
            $scope.komplet = arr.map(x=>x);
            $scope.nestani = false;
        }, 1000)
    }
    $scope.scrollInto = function(neki){
        document.getElementById(neki).scrollIntoView({
            behavior: 'smooth'
        })
    }

    $(document).on('mouseenter',".rotholder",function(){
        $(this).find(".dodatniopis").fadeIn();
    });

    
    $(document).on('mouseleave',".rotholder",function(){
        $(this).find(".dodatniopis").fadeOut();
    });

    const scrollLine = document.querySelector('.scroll-line');
    $(document).on('scroll',function(){
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.clientHeight;
        const scrolled = window.scrollY;
        const percentScrolled = (scrolled / (fullHeight - windowHeight) * 100);
        scrollLine.style.width = percentScrolled + '%';
        scrollLine.style.width = `${percentScrolled}%` ;

        var navHeight = document.getElementById('glavniMeni').clientHeight;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar').addClass('fixed');
        }
        else {
            $('.navbar').removeClass('fixed');
        }
    })
    
    $scope.showDemo = function(ime) {
       
        if(ime == 'haljina') {
            localStorage.setItem('putanja','haljina.mp4');
        } else if(ime == 'chatHorizon') {
            localStorage.setItem('putanja','fullChatroom.jpg');
        } else if(ime == 'xbox') {
            localStorage.setItem('putanja','XBOX.mp4');
        } else if(ime == 'blueDrone') {
            localStorage.setItem('putanja','BlueDrone.mp4');
        } else if(ime == 'ibooked') {
            localStorage.setItem('putanja','iBooks.mp4');
        } else if(ime == 'temp1') {
            localStorage.setItem('putanja','temp1.mp4');
        } else if(ime == 'temp2') {
            localStorage.setItem('putanja','temp2.mp4');
        } else if(ime == 'temp3') {
            localStorage.setItem('putanja','temp3.mp4');
        }
        $uibModal.open({
            templateUrl: 'srpski/modalStranice.html',
            controller: 'customDialogCtrl',
            size: 'xl',
        }).result.catch(function (resp) {
            if (['cancel', 'backdrop click', 'escape key press'].indexOf(resp) === -1) throw resp;
        });
    }

    $scope.loadVid = function() {
        $scope.put = localStorage.getItem('putanja');
        var el = $scope.put.split(".")[1].trim();
        if(el == 'png') {
            $scope.alter = $scope.put.split(".")[0].trim();
            $scope.pokazi = true;
        } else {
            $scope.put1 = $scope.put.split(".")[0].trim() + '.webm';
            $scope.pokazi = false;
        }
    }

    $scope.scrollToTop = function() {
        $window.scrollTo(0, 0);
    }
    $scope.otvori = function(linkza){
        $window.open(linkza, '_blank');
    }

    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';
    toastr.options.progressBar = true;

    $scope.posaljiPoruku = function(poruka) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(poruka === undefined) {
            toastr.error('Unesite barem e-mail adresu i poruku šaljete.')
        } else if(poruka.mejl === '' || poruka.mejl === undefined || !re.test(poruka.mejl)) {
            toastr.error('Unesite pravilno e-mail adresu.')
        } else if(poruka.msg === '' || poruka.msg === undefined) {
            toastr.error('Unesite vašu poruku.')
        } else {
            var vData = {
                ime: (poruka.ime == undefined ? '': poruka.ime),
                mejl:poruka.mejl,
                telefon:(poruka.telefon == undefined ? '':poruka.telefon),
                naslov:(poruka.naslov == undefined ? '':poruka.naslov),
                msg:poruka.msg,
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post('http://www.devechron.com/api/sendContact.php',vData).then(function (response) {
                if (response.data.status == "uspesno") {
                    toastr.success('Kontaktiraćemo vas u najkraćem roku.','Uspešno poslata poruka');
                    poruka.ime = "";
                    poruka.mejl = "";
                    poruka.telefon = "";
                    poruka.naslov = "";
                    poruka.msg = "";
                } else {
                    toastr.error('Kontaktirajte nas preko SMS poruke.','Nespešno slanje.')
                    console.log(response.data.error);
                }
            });
        }
    }
    
});


app.controller('customDialogCtrl', function ($scope, $uibModalInstance, $rootScope) {
    $rootScope.$on("CallParentMethod", function () {
      $uibModalInstance.dismiss('Canceled');
    });
    $scope.cancel = function () {
      $uibModalInstance.dismiss('Canceled');
    };
  
});