import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, Pressable, Image } from "react-native";
import { DATA_ALBUMS } from "./src/data/albumsData";
import DetailScreen from "./src/components/DetailScreen";
import FavoritesScreen from "./src/components/FavoritesScreen";

export default function App() {
  const [albums, setAlbums] = useState(DATA_ALBUMS);
  const [pantallaActual, setPantallaActual] = useState("home");
  const [albumSeleccionadoId, setAlbumSeleccionadoId] = useState(null);
  const [resenaTemporal, setResenaTemporal] = useState("");

  const toggleLike = (id) => {
    setAlbums((actual) => actual.map((a) => a.id === id ? { ...a, like: !a.like, dislike: false } : a));
  };

  const toggleDislike = (id) => {
    setAlbums((actual) => actual.map((a) => a.id === id ? { ...a, dislike: !a.dislike, like: false } : a));
  };

  const toggleFavorito = (id) => {
    setAlbums((actual) => actual.map((a) => a.id === id ? { ...a, esFavorito: !a.esFavorito } : a));
  };

  const guardarResena = (id) => {
    setAlbums((actual) => actual.map((a) => a.id === id ? { ...a, review: resenaTemporal } : a));
  };

  const puntuarCancion = (albumId, indiceTrack, puntuacion) => {
    setAlbums((actual) =>
      actual.map((album) => {
        if (album.id === albumId) {
          const tracksActualizados = [...album.tracks];
          tracksActualizados[indiceTrack] = { ...tracksActualizados[indiceTrack], rating: puntuacion };
          return { ...album, tracks: tracksActualizados };
        }
        return album;
      })
    );
  };

  const albumSeleccionado = albums.find((a) => a.id === albumSeleccionadoId);
  const totalFavoritos = albums.filter((a) => a.esFavorito).length;
  const totalResenas = albums.filter((a) => a.review.trim() !== "").length;

  function renderAlbumCard({ item }) {
    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          setAlbumSeleccionadoId(item.id);
          setResenaTemporal(item.review);
          setPantallaActual("detail");
        }}
      >
        <View style={styles.albumInfo}>
          <Image source={item.cover} style={styles.albumListCover} />
          <View style={{ flex: 1 }}>
            <Text style={styles.albumTitle}>{item.titulo}</Text>
            <Text style={styles.albumArtist}>{item.artista} ({item.año})</Text>
            <Text style={styles.statusBadge}>
              {item.esFavorito ? "Favorito " : ""}
              {item.review ? "Con Reseña" : ""}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={styles.phoneFrame}>
          <View style={styles.phoneTop} />
          <View style={styles.phoneScreen}>


            {pantallaActual === "home" && (

              <View style={{ flex: 1 }}>
                
                <Text style={styles.title}>PopBoxd</Text>
                <Text style={styles.subtitle}>Tu registro de música pop</Text>



                <FlatList
                  data={albums}
                  keyExtractor={(item) => item.id}
                  renderItem={renderAlbumCard}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                />

                <Pressable style={styles.navTabButton} onPress={() => setPantallaActual("favorites")}>
                  <Text style={styles.navButtonText}>Ver Mis Favoritos</Text>
                </Pressable>
              </View>
            )}


            {pantallaActual === "detail" && albumSeleccionado && (
              <DetailScreen
                albumSeleccionado={albumSeleccionado}
                onVolver={() => setPantallaActual("home")}
                onLike={toggleLike}
                onDislike={toggleDislike}
                onFavorito={toggleFavorito}
                onPuntuarCancion={puntuarCancion}
                resenaTemporal={resenaTemporal}
                setResenaTemporal={setResenaTemporal}
                onGuardarResena={guardarResena}
                styles={styles}
              />
            )}


            {pantallaActual === "favorites" && (
              <FavoritesScreen
                albums={albums}
                onVolver={() => setPantallaActual("home")}
                onSeleccionarAlbum={(id) => {
                  const album = albums.find((a) => a.id === id);
                  setAlbumSeleccionadoId(id);
                  setResenaTemporal(album.review);
                  setPantallaActual("detail");
                }}
                styles={styles}
              />
            )}

          </View>
          <View style={styles.homeBar} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000000" },
  outerContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  phoneFrame: { width: 360, height: 700, borderRadius: 56, backgroundColor: "#0f172a", padding: 14 },
  phoneTop: { width: 120, height: 6, backgroundColor: "#334155", borderRadius: 999, alignSelf: "center", marginBottom: 14 },
  phoneScreen: { flex: 1, borderRadius: 40, backgroundColor: "#020617", padding: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#f8fafc", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 16 },
  counterBox: { backgroundColor: "#1e293b", borderRadius: 20, padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16, borderWidth: 1, borderColor: "#334155" },
  counterItem: { flex: 1, alignItems: "center" },
  counterNumber: { fontSize: 24, fontWeight: "bold", color: "#38bdf8" },
  counterLabel: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  counterDivider: { width: 1, height: 30, backgroundColor: "#334155" },
  listContent: { paddingBottom: 10 },
  card: { backgroundColor: "#0f172a", borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#1e293b" },
  albumInfo: { flexDirection: "row", alignItems: "center" },
  albumListCover: { width: 55, height: 55, borderRadius: 8, marginRight: 14 },
  albumTitle: { fontSize: 18, fontWeight: "bold", color: "#f8fafc" },
  albumArtist: { color: "#94a3b8", fontSize: 13, marginTop: 2 },
  statusBadge: { fontSize: 11, color: "#38bdf8", marginTop: 4, fontWeight: "600" },
  backButton: { marginBottom: 16, alignSelf: "flex-start" },
  backButtonText: { color: "#38bdf8", fontSize: 14, fontWeight: "600" },
  detailCover: { width: 140, height: 140, borderRadius: 12, alignSelf: "center", marginBottom: 14 },
  detailTitle: { fontSize: 24, fontWeight: "bold", color: "#f8fafc", textAlign: "center" },
  detailArtist: { fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 12 },
  averageContainer: { backgroundColor: "#0f172a", padding: 8, borderRadius: 8, alignSelf: "center", marginBottom: 16, borderWidth: 1, borderColor: "#1e293b" },
  averageText: { color: "#eab308", fontWeight: "bold", fontSize: 14 },
  buttonsContainer: { flexDirection: "row", gap: 8, marginBottom: 16 },
  button: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#1e293b" },
  likeButton: { borderColor: "#22c55e", borderWidth: 1 },
  dislikeButton: { borderColor: "#ef4444", borderWidth: 1 },
  favButton: { borderColor: "#eab308", borderWidth: 1 },
  activeButton: { backgroundColor: "#334155" },
  activeFavButton: { backgroundColor: "#eab308" },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 11 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#f8fafc", marginTop: 14, marginBottom: 8 },
  trackRatingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#1e293b" },
  trackText: { color: "#94a3b8", fontSize: 14, flex: 1, marginRight: 8 },
  starsContainer: { flexDirection: "row", gap: 2 },
  starIcon: { fontSize: 18, color: "#eab308" },
  input: { backgroundColor: "#0f172a", color: "#f8fafc", borderRadius: 10, padding: 10, height: 80, textAlignVertical: "top", borderColor: "#1e293b", borderWidth: 1, marginTop: 6 },
  saveButton: { backgroundColor: "#38bdf8", paddingVertical: 10, borderRadius: 10, alignItems: "center", marginTop: 10, marginBottom: 20 },
  saveButtonText: { color: "#020617", fontWeight: "bold" },
  navTabButton: { backgroundColor: "#1e293b", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 10 },
  navButtonText: { color: "#f8fafc", fontWeight: "600" },
  emptyText: { color: "#64748b", textAlign: "center", marginTop: 40 },
  homeBar: { width: 80, height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 999, alignSelf: "center", marginTop: 12 },
});