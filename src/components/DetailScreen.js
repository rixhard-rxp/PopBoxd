// src/components/DetailScreen.js
import React from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";

export default function DetailScreen({ 
  selectedAlbum, 
  onBack, 
  onLike, 
  onDislike, 
  onFavorite, 
  tempReview, 
  setTempReview, 
  onSaveReview,
  styles 
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Volver al Catálogo</Text>
      </Pressable>

      <Text style={styles.detailEmoji}>{selectedAlbum.emoji}</Text>
      <Text style={styles.detailTitle}>{selectedAlbum.title}</Text>
      <Text style={styles.detailArtist}>{selectedAlbum.artist} ({selectedAlbum.year})</Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => onLike(selectedAlbum.id)}
          style={[styles.button, styles.likeButton, selectedAlbum.liked && styles.activeButton]}
        >
          <Text style={styles.buttonText}>{selectedAlbum.liked ? "❤️ Liked" : "Like"}</Text>
        </Pressable>

        <Pressable
          onPress={() => onDislike(selectedAlbum.id)}
          style={[styles.button, styles.dislikeButton, selectedAlbum.disliked && styles.activeButton]}
        >
          <Text style={styles.buttonText}>{selectedAlbum.disliked ? "❌ Disliked" : "Dislike"}</Text>
        </Pressable>

        <Pressable
          onPress={() => onFavorite(selectedAlbum.id)}
          style={[styles.button, styles.favButton, selectedAlbum.isFavorite && styles.activeFavButton]}
        >
          <Text style={styles.buttonText}>{selectedAlbum.isFavorite ? "⭐ En Favs" : "Favorito"}</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Canciones</Text>
      {selectedAlbum.tracks.map((track, index) => (
        <Text key={index} style={styles.trackText}>
          🎵 {index + 1}. {track}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Tu Reseña Escrita</Text>
      <TextInput
        style={styles.input}
        placeholder="¿Qué opinas de este álbum?..."
        placeholderTextColor="#94a3b8"
        multiline
        value={tempReview}
        onChangeText={setTempReview}
      />
      <Pressable style={styles.saveButton} onPress={() => onSaveReview(selectedAlbum.id)}>
        <Text style={styles.saveButtonText}>Publicar Reseña 📝</Text>
      </Pressable>
    </ScrollView>
  );
}