import angular from "angular";

//módulo principal
const app = angular.module('ContactTree', []);

//diretiva que vai ser utilizada para renderizar dinâmicamente os contatos de cada grupo
app.directive('contacts', function(){
    return {
        template: `
            <ul class="contacts">
                <li class="contact" ng-repeat="contact in contact.contacts">
                    <div ng-click="toggleContacts($event, contact)">{{contact.name}}</div>
                </li>
            </ul
        `
    }
});


app.controller('mainCtrl', function($scope, $compile){
    $scope.contacts = [
        {
            id:1,
            name: "Friends",
            type: "Group",
            contacts: [
                {id:2, name: "Udi", type: "Contact"},
                {id:3, name: "Tommy", type: "Contact"},
                {
                    id:6,
                    name: "Old Friends",
                    type: "Group",
                    contacts: [
                        {id:7, name: "Itay", type: "Contact"},
                    ]
                },
            ]
        },
        {
            id:4,
            name: "Family",
            type: "Group",
            contacts: [
                {id:5, name: "Roni", type: "Contact"},
            ]
        },
        {id: 8, name: "Ori", type: "Contact"},
    ];


    $scope.toggleContacts = function(event, contact){

        if(angular.element(event.target).parent().find('ul').length){
            angular.element(event.target).parent().find('ul').parent().remove();
        }else {
            let childScope = $scope.$new();
            childScope.contact = contact;
            let compiledDirective = $compile('<contacts>');
            let directiveEl = compiledDirective(childScope);
            angular.element(event.target).parent().append(directiveEl);
        }

    }
});
