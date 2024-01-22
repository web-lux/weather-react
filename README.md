▶️ [Demo](https://weather-react-three.vercel.app/)

## 📄 Description

Une petite application météo réalisée dans le but de pratiquer TypeScript en conjonction avec React. Elle géolocalise le visiteur via son navigateur et utilise l'API [geocoding](https://openweathermap.org/api/geocoding-api) et [météo](https://openweathermap.org/current) d'Openweather pour obtenir le reste de ses données.

![Gif de l'application](preview.gif)

- L'utilisateur est automatiquement géolocalisé à l'ouverture de la page. S'il refuse de donner sa position, l'application recherche par défaut les données de Paris. L'utilisateur en est alerté via un toast.
- Il peut voir le temps, la température exacte et la température ressentie, le pourcentage d'humidité et la vitesse du vent de la ville recherchée.
- Il peut convertir la température de Celsius à Farenheit et inversement en 1 clic. Par défaut, l'application est en Celsius.
- Il peut rechercher une ville via la barre de recherche. 
- Si aucune ville n'est trouvée au nom entré, l'utilisateur est averti via un toast.
- S'il le souhaite, l'utilisateur peut enregistrer la ville actuelle dans un accès rapide ("Villes suivies") en un clic. Ainsi, il peut basculer d'une ville à l'autre facilement. 
- Il peut également supprimer une ville de ses villes suivies en 1 clic. 

## 🔨 Outils utilisés

- HTML
- SCSS
- Typescript
- React
