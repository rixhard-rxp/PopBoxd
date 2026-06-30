// src/components/FavoritesScreen.js
import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";

export default function FavoritesScreen({ albums, onVolver, onSeleccionarAlbum, styles }) {
    // Filtramos usando tu propiedad en español
    const albumsFavoritos = albums.filter((a) => a.esFavorito);

    function renderCardFavorito({ item }) {
        return (
            <Pressable style={styles.card} onPress={() => onSeleccionarAlbum(item.id)}>
                <View style={styles.albumInfo}>
                    <Image source={item.cover} style={styles.albumListCover} />
                    <View>
                        <Text style={styles.albumTitle}>{item.titulo}</Text>
                        <Text style={styles.albumArtist}>{item.artista} ({item.año})</Text>
                        <Text style={styles.statusBadge}>⭐ Favorito</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={styles.backButton} onPress={onVolver}>
                <Text style={styles.backButtonText}>← Volver al Catálogo</Text>
            </Pressable>

            <Text style={styles.title}>Mis Favoritos</Text>

            <FlatList
                data={albumsFavoritos}
                keyExtractor={(item) => item.id}
                renderItem={renderCardFavorito}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No has agregado ningún favorito aún.</Text>
                }
            />
        </View>
    );
}