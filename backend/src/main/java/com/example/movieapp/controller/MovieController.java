package com.example.movieapp.controller;

import com.example.movieapp.model.Movie;
import com.example.movieapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Collections;

@RestController
@CrossOrigin(origins = "*") // Allows frontend to call API
public class MovieController {
    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // ✅ Handle the root `/` URL (so it doesn’t go to a Whitelabel error)
    @GetMapping("/")
    public ResponseEntity<Map<String, String>> home() {
        return ResponseEntity.ok(Collections.singletonMap("message", "Welcome to the Movie API! Use /movies to fetch data."));
    }

    // ✅ Movies API should only handle `/movies`
    @RequestMapping("/movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    // ✅ Add a new movie
    @PostMapping("/movies/add")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieService.addMovie(movie);
        return ResponseEntity.ok(savedMovie);
    }

    // ✅ Get a movie by title
    @GetMapping("/movies/{title}")
    public ResponseEntity<Movie> getMovieByTitle(@PathVariable String title) {
        Movie movie = movieService.getMovieByTitle(title);
        return movie != null ? ResponseEntity.ok(movie) : ResponseEntity.notFound().build();
    }

    // ✅ Delete a movie by title
    @DeleteMapping("/movies/{title}")
    public ResponseEntity<Void> deleteMovieByTitle(@PathVariable String title) {
        movieService.deleteMovieByTitle(title);
        return ResponseEntity.noContent().build();
    }
}
