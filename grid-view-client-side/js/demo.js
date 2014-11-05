mdlCommon.controller('DemoController', function ($scope, $controller) {
    $controller('ctrlPaging', { $scope: $scope }); //This works
    //$scope.Config.OrderBy = "employeeNo";
    
    $scope.GetListDataFromDB = function () {
        return [{ RowId: 1, EmployeeNo: "VH0001", EmployeeName: "Nguyen Tien Luan", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" },
                             { RowId: 2, EmployeeNo: "VH0002", EmployeeName: "Nguyen Huu Tai", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" },
                             { RowId: 3, EmployeeNo: "VH0003", EmployeeName: "Duong Van Si", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" },
                             { RowId: 4, EmployeeNo: "VH0004", EmployeeName: "Le Van Tho", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" },
                             { RowId: 5, EmployeeNo: "VH0005", EmployeeName: "Nguyen Thu Dan", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" },
                             { RowId: 6, EmployeeNo: "VH0006", EmployeeName: "Duong Thuy Vy", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" },
                             { RowId: 7, EmployeeNo: "VH0007", EmployeeName: "Nguyen Huu Vinh", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" },
                             { RowId: 8, EmployeeNo: "VH0007", EmployeeName: "Nguyen Huu Vinh", OrgName: "RBVH/ETI", DirectManager: "Nguyen Huu Khiem", IndirectManager: "Henry" }];
        }


});
