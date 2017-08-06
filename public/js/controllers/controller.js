function AppCtrl($scope, $http) {

	/**
	 * Get all the contact list when page loads.
	 *
	 * @since 1.0.0
	 */	
	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			$scope.contactList = response;
			$scope.contact = "";
		});
	};
	refresh();

	/**
	 * Add contact to contact list.
	 *
	 * @since 1.0.0
	 */	
	$scope.addContact = function(){
		$http.post('/contactlist', $scope.contact).success(function(response){
			refresh();
		})
	};

	/**
	 * Remove contact from contact list.
	 *
	 * @since 1.0.0
	 */	
	$scope.remove = function(id){
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};

	/**
	 * Prepare data to update.
	 *
	 * @since 1.0.0
	 */	
	$scope.edit = function(id){
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
	};

	/**
	 * Update contact from contact list.
	 *
	 * @since 1.0.0
	 */	
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};


	// sample static data to populate from controller
	/*person1 = {
		name: 'tester1',
		email: 'tester1@gmail.com',
		number: '(111)-111-1111'
	};

	person2 = {
		name: 'tester2',
		email: 'tester2@gmail.com',
		number: '(222)-222-2222'
	};

	person3 = {
		name: 'tester3',
		email: 'tester3@gmail.com',
		number: '(333)-333-3333'
	};
	var contactList = [person1, person2, person3];
	$scope.contactList = contactList;*/
	
}