var mdlCommon = angular.module('mdlCommon', []);
mdlCommon.controller('ctlTreeView', function ($scope, $controller) {

    /*
    Get list nodes when page load
    */
    $scope.getListNodes = function () {
        return       [{ Id: 1, OrgName: "Root", ParentId: 0 },
                      { Id: 2, OrgName: "Node 1", ParentId: 1 },
                      { Id: 3, OrgName: "Node 2", ParentId: 1 },
                      { Id: 4, OrgName: "Node 3", ParentId: 1 },
                      { Id: 5, OrgName: "Node 1-1", ParentId: 2 },
                      { Id: 6, OrgName: "Node 1-2", ParentId: 2 },
                      { Id: 7, OrgName: "Node 1-3", ParentId: 2 },
                      { Id: 8, OrgName: "Node 2-1", ParentId: 3 },
                      { Id: 9, OrgName: "Node 2-2", ParentId: 3 },
                      { Id: 10, OrgName: "Node 2-3", ParentId: 3 },
                      { Id: 11, OrgName: "Node 3-1", ParentId: 4 },
                      { Id: 12, OrgName: "Node 3-2", ParentId: 4 },
                      { Id: 13, OrgName: "Node 1-1-1", ParentId: 5 },
                      { Id: 14, OrgName: "Node 1-1-2", ParentId: 5 },
                      { Id: 15, OrgName: "Node 2-3-1", ParentId: 10 }];
    }

    /*
    When user click on the node, this function will be fired
    */
    $scope.clickNode = function (node) {
        //alert(node);
    }

    /*
    Add a node into the tree, just add one element into the this.listNodes, and rebuild the tree
    */
    $scope.addNode = function (node) {
        this.listNodes.push(node);
        this.buildTree();
    }

    /*
    Delete a node from the tree, just remove one element from the this.listNodes, and rebuild the tree
    */
    $scope.deleteNode = function (node) {
        for (var i = this.listNodes.length - 1; i >= 0; i--) {
            if (this.listNodes[i] == node) {
                this.listNodes.splice(i, 1);
                break;
            }
        }
        this.buildTree();
    }

    //------------------------------------------------------
    $scope.tree = [];
    $scope.listNodes = [];
    $scope.initTree = function () {
        this.listNodes = this.getListNodes();
        this.buildTree();
    }

    $scope.buildTree = function () {
        var listNodes = this.listNodes;
        for (var i = 0; i < listNodes.length; i++) {
            listNodes[i].Children = [];
            for (var j = 0; j < listNodes.length; j++) {
                if (i != j && listNodes[i].Id == listNodes[j].ParentId) {
                    listNodes[i].Children.push(listNodes[j]);
                }
            }
        }

        this.tree = [];
        for (var i = 0; i < listNodes.length; i++) {
            if (listNodes[i].ParentId == 0) {
                this.tree.push(listNodes[i]);
            }
        }
    }

    $scope.toggle = function ($event) {
        var obj = $($event.target);
        if (obj.is("i")) {
            obj.closest("li").children("ul").toggle(100);
            obj.parent().children().toggle();
        }
        return false;
    }

    $scope.clickOnNode = function ($event, node) {
        $(".tree a.current-node").removeClass("current-node");
        $($event.target).addClass("current-node");
        this.clickNode(node);
    }
});
