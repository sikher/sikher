angular.module('starter.directives', [])

.directive('onEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.onEnter);
                });

                event.preventDefault();
            }
        });
    };
})

.directive('onKeyPress', function() {
    return {
        scope : {
            callBackMethod:'&keyPress'
        },
        link: function(scope,element,attrs){
            element.on('keydown', function(event){
                if(event.which === 39)
                {
                    scope.callBackMethod({$event:event});
                    event.preventDefault();
                }

                if(event.which === 37)
                {
                    scope.callBackMethod({$event:event});
                    event.preventDefault();
                }
            })
        }
    };
});