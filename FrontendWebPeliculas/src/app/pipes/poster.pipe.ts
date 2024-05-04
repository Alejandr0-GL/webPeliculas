import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  //Código para traer la imagen de una pelicula, se le envía el poster_path

  transform(poster:string): string {
    
    if(poster){
      return `https://image.tmdb.org/t/p/w500/${poster}`
    }
    else{
      return './assets/noImage.png';
    }
  }
}
