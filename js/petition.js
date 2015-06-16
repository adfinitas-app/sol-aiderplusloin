(function() {
	var app = angular.module('petition', ['firebase']);

	app.controller('SignatoryCtrl', ['$scope', '$firebase', function($scope, $firebase) {
		var ref = new Firebase("https://glaring-inferno-1729.firebaseIO.com/signatories");
		$scope.sync = $firebase(ref.orderByChild('signing_date').limitToLast(3));
		$scope.users = $scope.sync.$asArray();

		$scope.syncCount = $firebase(new Firebase("https://glaring-inferno-1729.firebaseIO.com/signCount"));
		$scope.objCount = $scope.syncCount.$asObject();
		$scope.objCount.$loaded().then(function(){
			$scope.counter = $scope.objCount.$value;
		});

		/* Préremplissage */

		// $scope.signatory = {
		// 	email: "lghionna@adfinitas.fr",
		// 	civility: "Mr",
		// 	firstname: "Lucas",
		// 	lastname: "Ghionna",
		// 	optin: true,
		// 	signing_date: 0
		// };

		$scope.addSignatory = function() {
			$scope.signatory.signing_date = Date.now();
			$scope.sync.$push($scope.signatory).then(function(ref) {
				$scope.signatory = {
					email: "",
					civility: "",
					firstname: "",
					lastname: "",
					optin: true,
					signing_date: 0
				};
				$scope.message = "Merci d'avoir signé la pétition !"
				$scope.syncCount.$transaction(function(currentCount) {
					if (currentCount < 0) return;
					return (currentCount || 0) + 1;
				}, false).then(function(snapshot) {
					if (snapshot === null) {		// Action si conflit

					} else {
						$scope.counter = snapshot.val();
					}
				}, function(error) {
					console.log("Error:", error);
				});
			}, function(error) {
				console.log("Error:", error);
			});
		};
	}]);
})();