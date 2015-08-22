App.CalendarController = Ember.ObjectController.extend({
	isToday: function(year, month, day){
		return (parseInt(year) == parseInt(new Date().getFullYear()) && parseInt(month) == parseInt(new Date().getMonth()+1) && parseInt(day-1) == parseInt(new Date().getDate())) ? true: false;
	},

	isSelected: function(modelDay, dayInWeek){
		return ((new Date().getDate() != parseInt(modelDay)) && (parseInt(modelDay) == parseInt(dayInWeek))) ? true: false;
	},

	actions: {
		prevYear: function(){
			var model = {
				year_value: parseInt(this.get('model').year_value) - 1,
				month_value: this.get('model').month_value,
				day_value: this.get('model').day_value
			};
			this.transitionTo('calendar', model);
		},
		prevMonth: function(){
			var model = {
				year_value: this.get('model').year_value,
				month_value: parseInt(this.get('model').month_value) - 1,
				day_value: this.get('model').day_value
			};

			if (model.month_value < 1) {
				model.month_value = 12;
				model.year_value = parseInt(model.year_value) - 1;
			};

			this.transitionTo('calendar', model);
		},
		nextYear: function(){
			var model = {
				year_value: parseInt(this.get('model').year_value) + 1,
				month_value: this.get('model').month_value,
				day_value: this.get('model').day_value
			};
			this.transitionTo('calendar', model);
		},
		nextMonth: function(){
			var model = {
				year_value: this.get('model').year_value ,
				month_value: parseInt(this.get('model').month_value) + 1,
				day_value: this.get('model').day_value
			};

			if (model.month_value > 12) {
				model.month_value = 1;
				model.year_value = parseInt(model.year_value) + 1;
			};

			this.transitionTo('calendar', model);
		},
		goToDay: function(){
			var date = new Date();
			var model = {
				year_value: date.getFullYear(),
				month_value: date.getMonth()+1,
				day_value: date.getDate()
			};
			this.transitionTo('calendar', model)
		},
		goToAnotherDay: function(day){
			var model = {
				year_value: parseInt(this.get('model').year_value),
				month_value: this.get('model').month_value,
				day_value: parseInt(day.title)
			};
			this.transitionTo('calendar', model);
		}
	},

	weeks: function(){
		var year = parseInt(this.get('model').year_value);
		var month = parseInt(this.get('model').month_value);

		var countDays = 32 - new Date(year, month-1, 32).getDate();
		var placeOfFirstDay = new Date(year, month-1, 1).getDay();

		if(placeOfFirstDay == 0) placeOfFirstDay = 7;

		var weeks = [];

		var firstWeek = [];
		var day = 1;
		for (var i = 1; i <= 7; i++){
			firstWeek.push(Ember.Object.create({
				title: i < placeOfFirstDay ? "" : day++,
				isToday: this.isToday(year, month, day),
				isSelected: this.isSelected(parseInt(this.get('model').day_value), day-1)
			}));
		}

		weeks.push(firstWeek);

		var week = [];
		for (var i = day; i <= countDays; i++) {
			week.push(Ember.Object.create({
				title: day++,
				isToday: this.isToday(year, month, day),
				isSelected: this.isSelected(parseInt(this.get('model').day_value), day-1)
			}));

			if(week.length == 7) {
				weeks.push(week);
				week = [];
			}
		};

		if(week.length > 0 && week.length < 6)
			for (var i = week.length - 1; i < 6; i++) {
				week.push(Ember.Object.create({
					title: "",
					isToday: this.isToday(year, month, day),
					isSelected: this.isSelected(parseInt(this.get('model').day_value), day-1)
				}));
			};

		weeks.push(week);

		return weeks;

	}.property('year_value', 'month_value', 'day_value')

});