import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      /**
       * Write code to get recipe
       */
       let recipeUrl = "https://api.edamam.com/search?app_id=46e25959&app_key=689efccefeaeace910779467d1512aed&q="
       const foodUrl = recipeUrl + this.recipeValue;
       this._http.get(foodUrl).subscribe(resp => {
         const recipes = resp['hits'];
         recipes.map(ele => {
           let recipe = ele['recipe'];
           const recobj = {
             name : ele .recipe.label,
             url: ele.recipe.url,
             icon: ele.recipe.image
           };
           this.recipeList.push(recobj);
 
         });
       });
    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      /**
       * Write code to get place
       */
       let venueUrl = "https://api.foursquare.com/v2/venues/search?"+
       "client_id="+
       "SOPXEGUELLFKORFM3XWGBOJDZ04GKVGVK0W5EGF0OBWJ4ZAV"+
       "&client_secret="+
       +"B2MACB43MFE25FG214NVMPXIZQLOCQ21VKLKQFGUSBFBKLEB"+
       "&v=20200224&query="
       const placeUrl = venueUrl + this.recipeValue + '&near=' + this.placeValue;
       this._http.get(placeUrl).subscribe(resp => {
         const venues = resp['response']['venues'];
         venues.map(ele => {
 
           const venobj = {
             name: ele.name,
             location : {
               formattedAddress: [ele.location.address, ele.location.city, ele.location.country]
             }
           };
           this.venueList.push(venobj);
         });
       });
    }
  }
}
