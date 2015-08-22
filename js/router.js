App.Router.map(function(){
	this.resource('calendar', {path: 'year/:year_value/month/:month_value/day/:day_value'});
});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function(){
		var date = new Date();
		var model = {
			year_value: date.getFullYear(),
			month_value: date.getMonth()+1,
			day_value: date.getDate()
		};
		this.transitionTo('calendar', model)
	}
});

App.CalendarRoute = Ember.Route.extend({
	model: function (params) {
		var retModel = {
			year_value: params.year_value,
			month_value: params.month_value,
			day_value: params.day_value
		}

		if(retModel.year_value > 0){
			if(retModel.month_value > 0 && retModel.month_value < 13){
				var count = 32 - new Date(retModel.year_value, retModel.month_value-1, 32).getDate();
				if(retModel.day_value > 0 && retModel.day_value < count+1)
				{
					return retModel;
				}
			}
		}

		this.transitionTo('index');
	}
})