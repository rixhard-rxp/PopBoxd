// src/components/DetailScreen.js
import React from "react";
import { View, Text, Pressable, TextInput, ScrollView, Image, Alert } from "react-native";

export default function DetailScreen({
    albumSeleccionado,
    onVolver,
    onLike,
    onDislike,
    onFavorito,
    onPuntuarCancion,
    resenaTemporal,
    setResenaTemporal,
    onGuardarResena,
    styles
}) {

    // Calcular el promedio de estrellas del álbum
    const totalPuntuaciones = albumSeleccionado.tracks.reduce((suma, track) => suma + track.rating, 0);
    const cancionesPuntuadas = albumSeleccionado.tracks.filter(track => track.rating > 0).length;
    const promedioAlbum = cancionesPuntuadas > 0 ? (totalPuntuaciones / cancionesPuntuadas).toFixed(1) : "0.0";

    const manejarPublicarResena = () => {
        onGuardarResena(albumSeleccionado.id);
        Alert.alert(
            "Reseña Publicada",
            `Tu opinión sobre el álbum "${albumSeleccionado.titulo}" se guardó exitosamente.`,
            [{ text: "Entendido" }]
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <Pressable style={styles.backButton} onPress={onVolver}>
                <Text style={styles.backButtonText}>← Volver al Catálogo</Text>
            </Pressable>

            <Image source={albumSeleccionado.cover} style={styles.detailCover} />
            <Text style={styles.detailTitle}>{albumSeleccionado.titulo}</Text>
            <Text style={styles.detailArtist}>{albumSeleccionado.artista} ({albumSeleccionado.año})</Text>

            {/* PROMEDIO DE ESTRELLAS */}
            <View style={styles.averageContainer}>
                <Text style={styles.averageText}>Promedio Álbum: {promedioAlbum} / 5.0</Text>
            </View>

            {/* BOTONES INTERACTIVOS */}
            <View style={styles.buttonsContainer}>
                <Pressable
                    onPress={() => onLike(albumSeleccionado.id)}
                    style={[styles.button, styles.likeButton, albumSeleccionado.like && styles.activeButton]}
                >
                    <Text style={styles.buttonText}>{albumSeleccionado.like ? "Liked" : "Like"}</Text>
                </Pressable>

                <Pressable
                    onPress={() => onDislike(albumSeleccionado.id)}
                    style={[styles.button, styles.dislikeButton, albumSeleccionado.dislike && styles.activeButton]}
                >
                    <Text style={styles.buttonText}>{albumSeleccionado.dislike ? "Disliked" : "Dislike"}</Text>
                </Pressable>

                <Pressable
                    onPress={() => onFavorito(albumSeleccionado.id)}
                    style={[styles.button, styles.favButton, albumSeleccionado.esFavorito && styles.activeFavButton]}
                >
                    <Text style={styles.buttonText}>{albumSeleccionado.esFavorito ? "En Favs" : "Favorito"}</Text>
                </Pressable>
            </View>

            {/* LISTA DE CANCIONES */}
            <Text style={styles.sectionTitle}>Puntuar Canciones</Text>
            {albumSeleccionado.tracks.map((track, indiceTrack) => (
                <View key={indiceTrack} style={styles.trackRatingRow}>
                    <Text style={styles.trackText}> {track.name}</Text>
                    <View style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((estrella) => (
                            <Pressable
                                key={estrella}
                                onPress={() => onPuntuarCancion(albumSeleccionado.id, indiceTrack, estrella)}
                            >
                                <Text style={styles.starIcon}>
                                    {estrella <= track.rating ? "★" : "☆"}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            ))}

            <Text style={styles.sectionTitle}>Tu Reseña Escrita</Text>
            <TextInput
                style={styles.input}
                placeholder="¿Qué opinas de este álbum?..."
                placeholderTextColor="#94a3b8"
                multiline
                value={resenaTemporal}
                onChangeText={setResenaTemporal}
            />
            <Pressable style={styles.saveButton} onPress={manejarPublicarResena}>
                <Text style={styles.saveButtonText}>Publicar Reseña</Text>
            </Pressable>
        </ScrollView>
    );
}