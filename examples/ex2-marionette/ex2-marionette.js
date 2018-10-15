(function(){


// 1 - common method, used in all the Marionette views below

function initialize(){

  this.on('treerouter:process', this.onRouterMount);
};

function templateContext(){

  var now = Date.now();
  var ctx = {
    x: this.options.x,
    now: now,
    ttp: now - this.options.req.processedAt
  }

  return ctx
};

function onRender(){

  console.log(this.viewName + ': onRender');
};

function onAttach(){

  console.log(this.viewName + ': onAttach');
};

function onRouterMount(viewWasRecycled, req){

  var message = this.viewName + ': onRouterMount' + (viewWasRecycled ? ' (view was re-used from a previous route)': '');
  console.log(message, req);
};


// 2 - define 5 view classes (they are essentially the same)

var ViewA = Mn.View.extend({
  initialize,
  viewName: 'viewA',
  attributes: {
    style: 'border: solid 1px red; padding: 20px; margin: 10px;'
  },
  template: _.template(`
    view A / instance option: <%= x %> / now: <%= now %> / time to process: <%= ttp %>
    <div data-region-id="r-a-one"></div>
    <div data-region-id="r-a-two"></div>
  `),
  regions: {
    'r-a-two': 'div[data-region-id="r-a-two"]',
    'r-a-one': 'div[data-region-id="r-a-one"]',
  },
  templateContext,
  onRender,
  onAttach,
  onRouterMount
});


var ViewB = Mn.View.extend({
  initialize,
  viewName: 'viewB',
  attributes: {
    style: 'border: solid 1px green; padding: 20px; margin: 10px;'
  },
  template: _.template(`
    view B / instance option: <%= x %> / now: <%= now %> / time to process: <%= ttp %>
    <div data-region-id="r-b-one"></div>
    <div data-region-id="r-b-two"></div>
  `),
  regions: {
    'r-b-one': 'div[data-region-id="r-b-one"]',
    'r-b-two': 'div[data-region-id="r-b-two"]'
  },
  templateContext,
  onRender,
  onAttach,
  onRouterMount
});


var ViewC = Mn.View.extend({
  initialize,
  viewName: 'viewC',
  attributes: {
    style: 'border: solid 1px blue; padding: 20px; margin: 10px;'
  },
  template: _.template(`
    view C / instance option: <%= x %> / now: <%= now %> / time to process: <%= ttp %>
    <div data-region-id="r-c-one"></div>
    <div data-region-id="r-c-two"></div>

  `),
  regions: {
    'r-c-one': 'div[data-region-id="r-c-one"]',
    'r-c-two': 'div[data-region-id="r-c-two"]'
  },
  templateContext,
  onRender,
  onAttach,
  onRouterMount
});


var ViewD = Mn.View.extend({
  initialize,
  viewName: 'viewD',
  attributes: {
    style: 'border: solid 1px yellow; padding: 20px; margin: 10px;'
  },
  regions: {
    'r-d-one': 'div[data-region-id="r-d-one"]',
    'r-d-two': 'div[data-region-id="r-d-two"]'
  },
  template: _.template(`
    view D / instance option: <%= x %> / now: <%= now %> / time to process: <%= ttp %>
    <div data-region-id="r-d-one"></div>
    <div data-region-id="r-d-two"></div>
  `),
  templateContext,
  onRender,
  onAttach,
  onRouterMount
});


var ViewE = Mn.View.extend({
  initialize,
  viewName: 'viewE',
  attributes: {
    style: 'border: solid 1px pink; padding: 20px; margin: 10px;'
  },
  regions: {
    'r-e-one': 'div[data-region-id="r-e-one"]',
    'r-e-two': 'div[data-region-id="r-e-two"]'
  },
  template: _.template(`
    view E / instance option: <%= x %> / now: <%= now %> / time to process: <%= ttp %>
    <div data-region-id="r-e-one"></div>
    <div data-region-id="r-e-two"></div>
  `),
  templateContext,
  onRender,
  onAttach,
  onRouterMount
});


// 3 - define the root region 

$('body').append('<main data-region-id="root"></main>');

var rootR = new Mn.Region({
    el: $('[data-region-id=root]')[0]
});


// 4 - the application code


// 4.1 - generic 'create' and 'mount' for marionette

function getRegion(view, regionName, index) {

  if (view instanceof Mn.View === false) {
    throw new Error('view is not an instance of Mn.View')
  }

  // if the regionToMount property is undefined, use instead the index-th region from the view

  if (regionName == null) {
    if ((regionName = Object.keys(view.getRegions()).sort()[index]) == null) {
      throw new Error('"regionToMount" is undefined and the view has less than ' + (index + 1) + ' region(s)');
    }
  }

  var region = view.getRegion(regionName);

  // assert that we actually have a region
  if (!(region instanceof Mn.Region)) {
    throw new Error('region "' + regionName + '" was not found in the view');
  }
  
  return region;
};

function create(parent, req, childData){

  if (parent == null && typeof childData.pre === 'function') {
    if (childData.pre(req) === false) { return }
  }

  var viewClass = childData.viewClass;
  var viewOptions = _.extend({ req }, childData.viewOptions);
  var region = (parent == null) ? rootR : getRegion(parent.view, childData.regionToMount, childData._index);

  var view, viewIsRecycled;

  if (region.currentView instanceof viewClass) {
    view = region.currentView;
    viewIsRecycled = true;
  }
  else {
    view = new viewClass(viewOptions);
    viewIsRecycled = false;
  }

  return { view, viewIsRecycled }

};

function mount(parent, current, req, childData) {

  // if we return null (or undefined), from create, stop processing right away
  // (this is useful for "redirect" routes)

  if (current == null) {
      return;
  }

  if (current.view instanceof Mn.View === false) {
    throw new Error('the "view" property in the current obj is not an instance of Mn.View');
  }

  var region;

  // parent might be null in some cases (for the 1st level objects in the tree)
 
  if (parent == null) {
    region = rootR;
  }
  else {
    if (parent.view instanceof Mn.View === false) {
      throw new Error('the "view" property in the parent obj is not an instance of Mn.View');
    }

    region = getRegion(parent.view, childData.regionToMount, childData._index);
  }

  if (current.viewIsRecycled === false) {
    region.show(current.view);
  }

  current.view.trigger('treerouter:process', current.viewIsRecycled, req);

  // note that region.show makes the following check:
  //
  //    if (view === this.currentView) { return this }
  //       
  // so in the code above we could have region.show(current.view) without 
  // the "viewIsRecycled" verification; however it's more clear this way
};


// 4.2 - create the router instance and add 4 routes

var myRouter = window.myRouter = new TreeRouter({
  mount,
  create
});

myRouter.on('route', function(req){

  console.log('route event was triggered in the router instance. request data: ', req)
});

var route1 = {
  path: '/foo-1(/)',
  children: [
    { 
      viewClass: ViewA,
      viewOptions: { x: 1 },

      children: [
        {
          viewClass: ViewB,
          viewOptions: { x: 2 },
        },
        {
          viewClass: ViewC,
          viewOptions: { x: 3 },
        }
      ],

    }
  ]
};

myRouter.addRoute(route1);


var route2 = {
  path: '/foo-2/:id(/)',
  children: [
    { 
      viewClass: ViewA,
      viewOptions: { x: 4 },

      children: [
        {
          viewClass: ViewB,
          viewOptions: { x: 5 },
        },
        {
          viewClass: ViewD,
          viewOptions: { x: 6 },
        }
      ],

    }
  ]
};
  
myRouter.addRoute(route2);


var route3 = {
  path: '/foo-3/:id/:name(/)',
  children: [
    { 
      viewClass: ViewA,
      viewOptions: { x: 7 },

      children: [
        {
          viewClass: ViewB,
          viewOptions: { x: 8 },
        },
        {
          viewClass: ViewE,
          viewOptions: { x: 9 },
        }
      ],

    }
  ]
};
  
myRouter.addRoute(route3);


var route4 = {
  path: '/foo-4(/)',
  children: [
    { 
      viewClass: ViewA,
      viewOptions: { x: 10 },

      children: [
        {
          viewClass: ViewB,
          viewOptions: { x: 11 },
        },
        
        {
          viewClass: ViewC,
          viewOptions: { x: 12 },
          create: (parent, req, childData) => {

            var p = new Promise((resolve, reject) => {

              setTimeout(() => {

                // view options can have can be resolved at runtime only
                var viewOptions = _.extend({}, childData.viewOptions, { x: 13 });
                childData.viewOptions = viewOptions;
                
                resolve(create(parent, req, childData));
              }, 1000)
              
            });

            return p;
          }
        }
        
      ],

    }
  ]
};
  
myRouter.addRoute(route4);


// 5 - finally, start the router

/*
5.1 - using the old-school hash
*/

myRouter.start();


/*
5.2 - using push state

var rootPath = '/examples/ex2-marionette/ex2-marionette.html';
myRouter.start({ hashChange: false, pushState: true, root: rootPath });
myRouter.navigate('/foo-1')
myRouter.navigate('/foo-2/abc')


we would need that all anchor/links to have some kind data attribute like this

  <a href="/foo-1" data-push-state>go to foo 1</a>

  <a href="/foo-2/abc" data-push-state>go to foo 2</a>

we would also need to have a handler to capture the click event;
if data-push-state is present, do something like

  ev.preventDefault()
  myRouter.navigate(href, { trigger: true })  
  return false; // ?

*/


})()
