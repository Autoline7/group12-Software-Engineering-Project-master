package com.example.movieapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String genre;
    private String cast;
    private String director;
    private String producer;
    private String synopsis;
    private String reviews;
    private String picture;
    private String video;
    private String mppa;
    private String showtimes;

    public Movie() {}

    public Movie(String title, String genre, String cast, String director,
                 String producer, String synopsis, String reviews, String picture,
                 String video, String mppa, String showtimes) {
        this.title = title;
        this.genre = genre;
        this.cast = cast;
        this.director = director;
        this.producer = producer;
        this.synopsis = synopsis;
        this.reviews = reviews;
        this.picture = picture;
        this.video = video;
        this.mppa = mppa;
        this.showtimes = showtimes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getMppa() {
        return mppa;
    }

    public void setMppa(String mppa) {
        this.mppa = mppa;
    }

    public String getShowtimes() {
        return showtimes;
    }

    public void setShowtimes(String showtimes) {
        this.showtimes = showtimes;
    }
}