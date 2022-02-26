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
       let recipeUrl = "https://api.edamam.com/search?"+
       "app_id="+
       "46e25959"+
       "&app_key="+
       "689efccefeaeace910779467d1512aed"+
       "&q="
       const foodUrl = recipeUrl + this.recipeValue;
       this._http.get(foodUrl).subscribe(data => {
         const recipes = data['hits'];
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
       const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3ZgBSY49GCzPC4OderO33N9x+bO7OVmzbn6ojAqNG3wQ='
        }
      };
      let venueUrl = "https://api.foursquare.com/v3/places/search?"+
      "&query="
      const placeUrl = venueUrl + this.recipeValue + '&near=' + this.placeValue;
      fetch(placeUrl, options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          const venues = response['results'];
          console.log(venues)
          venues.map(ele => {
  
            const venobj = {
              name: ele.name,
              location : {
                formattedAddress: [ele.location.address, ele.location.city, ele.location.country]
              }
            };
            this.venueList.push(venobj);
          });
        })
        .catch(err => console.error(err));

    }
  }
}
