///////////////
// Entities        underscore.js 1270 your new 2501 :P
///////////////

Cairo.module("Entities", function(Entities, Cairo, Backbone, Marionette, $, _) {
  Entities.Tree = Backbone.Model.extend({
    urlRoot: "/system/tree",

    defaults: {
      name: ""
    },

    validate: function(attrs, options) {
      var errors = {}
      if(! attrs.name) {
        errors.name = "can't be blank";
      }
      if( ! _.isEmpty(errors)) {
        return errors;
      }
    }
  });

  Entities.Leave = Backbone.Model.extend({
    urlRoot: "/system/leave",

    defaults: {
      id: 0,
      clientId: 0
    },

    validate: function(attrs, options) {
      var errors = {}
      if(attrs.clientId === 0) {
        errors.clientId = "can't be blank";
      }
      if( ! _.isEmpty(errors)) {
        return errors;
      }
    }
  });

  Entities.TreeCollection = Backbone.Collection.extend({
    url: function () {
            return '/system/trees/' + this.tableId;
         },
    model: Entities.Tree,
    comparator: "id",
    tableId: 0
  });

  Entities.LeaveCollection = Backbone.Collection.extend({
    url: function () {
            return '/system/branch/' + this.branchId;
         },
    model: Entities.Leave,
    comparator: "id",
    branchId: 0
  });

  var API = {
    getTreeEntities: function(tableId) {
      var trees = new Entities.TreeCollection();
      trees.tableId = tableId;
      var defer = $.Deferred();
      trees.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(trees) { });
      return promise;
    },

    getTreeEntity: function(treeId) {
      var tree = new Entities.Tree({id: treeId});
      var defer = $.Deferred();
      setTimeout(function() {
        tree.fetch({
          success: function(data) {
            defer.resolve(data);
          },
          error: function(data) {
            defer.resolve(undefined);
          }
        });
      }, 2000);
      return defer.promise();
    },

    getBranchEntity: function(branchId) {
      var leaves = new Entities.LeaveCollection();
      leaves.branchId = branchId;
      var defer = $.Deferred();
      leaves.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(leaves) { });
      return promise;
    }
  };

  Cairo.reqres.setHandler("tree:entities", function(tableId) {
    return API.getTreeEntities(tableId);
  });

  Cairo.reqres.setHandler("tree:entity", function(treeId) {
    return API.getTreeEntity(treeId);
  });

  Cairo.reqres.setHandler("branch:entity", function(branchId) {
    return API.getBranchEntity(branchId);
  });

});

///////////////
// Handler
///////////////

Cairo.module("Tree", function(Tree, Cairo, Backbone, Marionette, $, _) {});

///////////////
// Views
///////////////

Cairo.module("Tree.List", function(List, Cairo, Backbone, Marionette, $, _) {
  List.Tree = Backbone.View.extend({
    tagName: "select",
    className: "form-control tree-select",
    events: {
        "change": "clicked"
    },

    clicked: function(e) {
        e.preventDefault();
        var treeId = $(e.currentTarget).val();
        Cairo.Tree.List.Controller.listTree(treeId, this.listController);
    },

    render: function() {
        var template = _.template($("#tree-item-template").html());
        var el = $(this.el);
        this.collection.each(function(model) {
            var html = template(model.toJSON());
            el.append(html);
        });
        try {
            var treeId = this.collection.first().get("id");
            Cairo.Tree.List.Controller.listTree(treeId, this.listController);
        }
        catch (e) {
        }
    }
  });

  List.OldItems = Backbone.View.extend({
    tagName: "select",
    className: "form-control tree-select",
    events: {
        "change": "clicked"
    },

    clicked: function(e) {
        e.preventDefault();
        var treeId = $(e.currentTarget).val();
        Cairo.Tree.List.Controller.listTree(treeId);
    },

    render: function() {
        var template = _.template($("#tree-list-template").html());
        var el = $(this.el);
        this.collection.each(function(model) {
            var html = template(model.toJSON());
            el.append(html);
        });
        try {
            var treeId = this.collection.first().get("id");
            Cairo.Tree.List.Controller.listTree(treeId, this.listController);
        }
        catch (e) {
        }
    }
  });
  
  // new list
  List.Layout = Marionette.Layout.extend({
    template: "#tree-list-layout-template",

    regions: {
      panelRegion: "#tree-panel-region",
      treesRegion: "#trees-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template: "#tree-list-panel-template",

    triggers: {
      "click button.js-new": "tree:new"
    },

    events: {
      "submit #filter-form": "filterTrees"
    },

    ui: {
      criterion: "input.js-filter-criterion"
    },

    filterTrees: function(e) {
      e.preventDefault();
      var criterion = this.$(".js-filter-criterion").val();
      this.trigger("trees:filter", criterion);
    },

    onSetFilterCriterion: function(criterion) {
      this.ui.criterion.val(criterion);
    }
  });

  List.Item = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#tree-list-item-template",

    triggers: {
      "click td a.js-edit": "item:edit",
      "click button.js-delete": "item:delete"
    },

    events: {
      "click": "highlightName"
    },

    flash: function(cssClass) {
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function() {
        setTimeout(function() {
          $view.toggleClass(cssClass)
        }, 500);
      });
    },

    highlightName: function(e) {
      this.$el.toggleClass("warning");
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  var NoItemsView = Marionette.ItemView.extend({
    template: "#tree-list-none-template",
    tagName: "tr",
    className: "alert"
  });

  List.Items = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#tree-list-template",
    emptyView: NoItemsView,
    itemView: List.Item,
    itemViewContainer: "tbody",

    initialize: function() {
      this.listenTo(this.collection, "reset", function() {
        this.appendHtml = function(collectionView, itemView, index) {
          collectionView.$el.append(itemView.el);
        }
      });
    },

    onCompositeCollectionRendered: function() {
      this.appendHtml = function(collectionView, itemView, index) {
        collectionView.$el.prepend(itemView.el);
      }
    }
  });  
  // end new list

});

///////////////
// Controller
///////////////

Cairo.module("Tree.List", function(List, Cairo, Backbone, Marionette, $, _) {
  List.Controller = {
    listTree: function(treeId, listController) {
      var loadingView = new Cairo.Common.Views.Loading();
      Cairo.loadingRegion.show(loadingView);

      var fetchingTree = Cairo.request("tree:entity", treeId);

      $.when(fetchingTree).done(function(tree) {
        try {
            $("#tree").fancytree("destroy");
        }
        catch (e) {}
        $("#tree").fancytree({
            source: [tree.attributes[0]],
            activate: function(event, data) {
                        Cairo.logTreeEvent(event, data);
                        listController.showBranch(data.node.key)
                      }
        });
        Cairo.loadingRegion.close();
      });
    },

    list: function(tableId, mainView, listController) {
      var loadingView = new Cairo.Common.Views.Loading();
      Cairo.loadingRegion.show(loadingView);

      var fetchingTrees = Cairo.request("tree:entities", tableId);

      $.when(fetchingTrees).done(function(trees) {
        var view = new List.Tree({collection: trees});
        view.listController = listController;
        view.render();
        $("#trees", mainView.$el).html(view.el);
      });
    },

    listBranch: function(branchId, criterion, showItem, listController) {
      var loadingView = new Cairo.Common.Views.Loading();
      Cairo.loadingRegion.show(loadingView);

      var fetchingBranch = Cairo.request("branch:entity", branchId);
      
      var itemsListLayout = new List.Layout();
      var itemsListPanel = new List.Panel();      

      $.when(fetchingBranch).done(function(branch) {
        //showItem(branch, criterion, new List.Items({collection: branch}), listController);
        showItem(branch, criterion, itemsListPanel, itemsListLayout, listController);
      });
    },
    
    showItem: function(branch, criterion, itemsListPanel, itemsListLayout, listController) {
      /*
      view.listController = listController;
      view.render();
      $("#items").html(view.el);
      */
      var filteredItems = Cairo.Entities.FilteredCollection({
        collection: branch,
        filterFunction: function(filterCriterion) {
          var criterion = filterCriterion.toLowerCase();
          return function(leave) {
            var matches = false;
            leave.values.forEach(function(value) {
              if(value.toLowerCase().indexOf(criterion) !== -1) matches = true; 
            });
            if(matches) {
                return leave;
            }
          };
        }
      });
            
      if(criterion) {
        filteredItems.filter(criterion);
        itemsListPanel.once("show", function() {
          itemsListPanel.triggerMethod("set:filter:criterion", criterion);
        });
      }
            
      var itemsListView = new List.Items({
        collection: filteredItems
      });
            
      itemsListPanel.on("items:filter", function(filterCriterion) {
        filteredItems.filter(filterCriterion);
        Cairo.trigger("items:filter", filterCriterion);
      });
            
      itemsListLayout.on("show", function() {
        itemsListLayout.panelRegion.show(itemsListPanel);
        itemsListLayout.itemsRegion.show(itemsListView);
      });
            
      itemsListPanel.on("item:new", function() {
      
        // TODO: call to controller listController.newItem
      
        /*
        var newUsuario = new Cairo.Entities.Usuario();
            
        var view = new Cairo.Usuario.New.Usuario({
          model: newUsuario
        });
            
        view.on("form:submit", function(data) {
          if(usuarios.length > 0) {
            var highestId = usuarios.max(function(c) { return c.id; }).get("id");
            data.id = highestId + 1;
          }
          else{
            data.id = 1;
          }
          if(newUsuario.save(data)) {
            usuarios.add(newUsuario);
            view.trigger("dialog:close");
            var newUsuarioView = usuariosListView.children.findByModel(newUsuario);
            // check whether the new usuario view is displayed (it could be
            // invisible due to the current filter criterion)
            if(newUsuarioView) {
              newUsuarioView.flash("success");
            }
          }
          else{
            view.triggerMethod("form:data:invalid", newUsuario.validationError);
          }
        });
            
        Cairo.dialogRegion.show(view);
        */
      });
            
      itemsListView.on("itemview:item:edit", function(childView, args) {
      
        // TODO: call to controller listController.editItem
      
        //Cairo.trigger("usuario:edit", args.model.get("id"));
        /*
        var model = args.model;
        var view = new Cairo.Usuario.Edit.Usuario({
          model: model
        });
            
        view.on("form:submit", function(data) {
          if(model.save(data)) {
            childView.render();
            view.trigger("dialog:close");
            childView.flash("success");
          }
          else{
            view.triggerMethod("form:data:invalid", model.validationError);
          }
        });
            
        Cairo.dialogRegion.show(view);
        */
      });
            
      itemsListView.on("itemview:item:delete", function(childView, args) {
        // TODO: test how it works
        args.model.destroy();
      });
            
      Cairo.mainRegion.show(itemsListLayout);
    }

  };
});