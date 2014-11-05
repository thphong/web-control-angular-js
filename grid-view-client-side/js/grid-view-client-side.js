var mdlCommon = angular.module('mdlCommon', []);

mdlCommon.directive('gridPaging', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.template = '<div ng-init="InitData();"></div>'
        + '<ul class="pagination" ng-if="DataSet.TotalItems > 0" style="margin-top: 0px">'
        + '<li ng-class="{disabled: Config.CurrentPage == 1}" ng-click="GridChangePageIndex(1)" title="Page 1">'
        + '<a href="#"> &laquo; </a>'
        + '</li>'
        + '<li ng-if="Config.StartIndex > 1" ng-click="GridChangePageIndex(Config.StartIndex-1)">'
        + '<a href="#"> ...  </a>'
        + '</li>'
        + '<li class="PagingItem" ng-repeat="index in ListPageIndex" ng-class="{active: index==Config.CurrentPage }" ng-click="GridChangePageIndex(index)">'
        + '<a href="#"> {{index}} </a>'
        + '</li>'
        + '<li class="PagingItem" ng-if="Config.EndIndex < Config.NumOfPage" ng-click="GridChangePageIndex(Config.EndIndex+1)">'
        + '<a href="#"> ...  </a>'
        + '</li>'
        + '<li class="PagingItem" ng-class="{disabled: Config.CurrentPage==Config.NumOfPage}" ng-click="GridChangePageIndex(Config.NumOfPage)" title="Page {{Config.NumOfPage}}">'
        + ' <a href="#"> &raquo; </a>'
        + '</li>'
        + '</ul>';
    return directive;
});

mdlCommon.directive('gridPageSize', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.template =
          '<div class="input-group">  <span class="input-group-addon"> Page size: </span>'
        + '<select class="form-control input-sm" ng-model="Config.NumOfItemOnPage" ng-change="GridChangeNumRowsOnPage()" data-ng-options="num as num for num in ListNumOfItem">'
        + '</select> '
        + ' <span class="input-group-addon"> / Total {{DataSet.TotalItems}} </span>'
        + '</div>';
    return directive;
});

mdlCommon.directive('gridFilter', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.template =
        '<div class="input-group">'
        + '<input type="text" class="form-control input-sm" placeholder="Filter" ng-model="Config.FilterBy">'
        + '<span class="input-group-btn">'
        + '<button class="btn btn-default input-sm" type="button" ng-click="GridFilter()"><i class="glyphicon glyphicon-search"></i></button>'
        + '</span>'
        + '</div>'
    return directive;
});

mdlCommon.directive('gridSortBy', function () {
    var directive = {};
    directive.restrict = 'A';
    directive.compile = function (element, attributes) {
        element.append(' <a href="#" ng-click="GridSortBy(\'' + attributes.gridSortBy + '\')">'
                       + '<i class="fa" ng-class="{\'fa-sort-up\': Config.OrderBy == \'' + attributes.gridSortBy + '\' && Config.OrderDirection > 0,' +
                                                        ' \'fa-sort-down\': Config.OrderBy == \'' + attributes.gridSortBy + '\' && Config.OrderDirection < 0,' +
                                                         '\'fa-sort\': Config.OrderBy != \'' + attributes.gridSortBy + '\' }">'
                       + '</i>'
                       + '</a>');
        return null;
    }
    return directive;
});


mdlCommon.controller('ctrlPaging', function ($scope, $filter) {
    /*begin configurable*/
    //Number of displayed index in the paging. It should be odd number
    $scope.NumDisplayedIndex = 5;
    //List number which user can choose	
    $scope.ListNumOfItem = [5, 10, 20, 50, 100];
    /*end configurable*/

    /*begin user's input*/
    //Number of record on one Page
    $scope.Config = {
        "NumOfItemOnPage": 5,
        "NumOfPage": 0,
        "StartIndex": 0,
        "EndIndex": 0,
        "CurrentPage": 1,
        "FilterBy": "",
        "OrderBy": "",
        "OrderDirection": 1,
        "StartRow": 0, //base index: 1
        "EndRow": 1 //base index: 1
    };
    $scope.ListPageIndex = [];
    /*end user's input*/

    /*begin dataset*/
    //Total number of record
    $scope.DataSet = {
        "TotalItems": 0,
        "Data": [],
        "RawData": [],
        "FilterData": []
    }

    $scope.HasRecord = function () {
        return this.DataSet.TotalItems > 0;
    }

    /*end dataset*/

    /*begin temp para*/
    //Number of page
    $scope.GetNumOfPage = function () {
        this.Config.NumOfPage = Math.ceil(this.DataSet.TotalItems / this.Config.NumOfItemOnPage);
    }
    //Get first index is shown
    $scope.GetStartIndex = function () {
        this.Config.StartIndex = this.Config.CurrentPage - Math.floor(this.NumDisplayedIndex / 2);
        var endShowIndex = this.Config.CurrentPage + Math.floor(this.NumDisplayedIndex / 2);
        if (endShowIndex > this.Config.NumOfPage) {
            this.Config.StartIndex -= (endShowIndex - this.Config.NumOfPage);
        }
        if (this.Config.StartIndex <= 0) {
            this.Config.StartIndex = 1;
        }
    }
    //Get last index is shown
    $scope.GetEndIndex = function () {
        var startShowIndex = this.Config.CurrentPage - Math.floor(this.NumDisplayedIndex / 2);
        this.Config.EndIndex = this.Config.CurrentPage + Math.floor(this.NumDisplayedIndex / 2);
        if (startShowIndex <= 0) {
            this.Config.EndIndex += 1 - startShowIndex;
        }
        if (this.Config.EndIndex > this.Config.NumOfPage) {
            this.Config.EndIndex = this.Config.NumOfPage;
        }
    }
    $scope.GetListPageIndex = function () {
        while (this.ListPageIndex.length > 0) {
            this.ListPageIndex.pop();
        }
        for (var i = this.Config.StartIndex; i <= this.Config.EndIndex; i++) {
            this.ListPageIndex.push(i);
        }
    }

    $scope.CalculatedTmpPara = function () {
        this.GetNumOfPage();
        this.GetStartIndex();
        this.GetEndIndex();
        this.GetListPageIndex();
        
        if (this.Config.CurrentPage > this.Config.EndIndex && this.Config.EndIndex) {
            this.Config.CurrentPage = this.Config.EndIndex;
        }
        var startRow = this.Config.StartRow = (this.Config.CurrentPage - 1) * this.Config.NumOfItemOnPage + 1;
        var endRow = this.Config.EndRow = this.Config.CurrentPage * this.Config.NumOfItemOnPage;
        
        this.DataSet.Data = [];
        var rawData = this.DataSet.FilterData;
        for (var i = Math.max(startRow - 1, 0); i < endRow && i < rawData.length; i++) {
            this.DataSet.Data.push(rawData[i]);
        }
    }
    /*end temp para*/

    //index is base-1
    $scope.GridChangePageIndex = function (index) {
        if (this.Config.CurrentPage != index) {
            this.Config.CurrentPage = index;
            this.CalculatedTmpPara();
        }
    }

    $scope.GridChangeNumRowsOnPage = function () {
        this.CalculatedTmpPara();
    };

    $scope.GridFilter = function () {
        if (this.Config.FilterBy) {
            this.DataSet.FilterData = $filter('filter')(this.DataSet.RawData, this.Config.FilterBy);
        }
        else {
            this.DataSet.FilterData = this.DataSet.RawData;
        }
        this.DataSet.TotalItems = this.DataSet.FilterData.length;
        this.CalculatedTmpPara();
    };

    $scope.GridSortBy = function (sortBy) {
        if (this.Config.OrderBy == sortBy) {
            this.Config.OrderDirection = -this.Config.OrderDirection;
        }
        else {
            this.Config.OrderBy = sortBy;
            this.Config.OrderDirection = 1;
        }

        this.DataSet.RawData = $filter('orderBy')(this.DataSet.RawData, sortBy, this.Config.OrderDirection < 0);
        this.GridFilter();
    };

    $scope.InitData = function () {
        //Get Data from DB
        this.DataSet.RawData = this.GetListDataFromDB();
        this.DataSet.FilterData = this.DataSet.RawData;
        this.DataSet.TotalItems = this.DataSet.FilterData.length;
        this.CalculatedTmpPara();
    }

    $scope.AddRow = function (record) {
        this.DataSet.RawData.push(record);
        this.GridSortBy(this.Config.OrderBy);
    }
});
