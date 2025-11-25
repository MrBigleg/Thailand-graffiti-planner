/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { FunctionCall } from '../state';
import { Type } from '@google/genai';

export const itineraryPlannerTools: FunctionCall[] = [
  {
    name: 'mapsGrounding',
    description: `A versatile tool that leverages Google Maps data to generate contextual information and creative content about places. It can be used for two primary purposes:

    1.  **For Itinerary Planning:** Find and summarize information about places like restaurants, museums, or parks. Use a straightforward query to get factual summaries of top results.
        -   **Example Query:** "fun museums in Paris" or "best pizza in Brooklyn".

    2.  **For Creative Content:** Generate engaging narratives, riddles, or scavenger hunt clues based on real-world location data. Use a descriptive query combined with a custom 'systemInstruction' to guide the tone and content.`,
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description:
            "The search query for Google Maps. Can be a place name, category, or a descriptive request.",
        },
        markerBehavior: {
          type: Type.STRING,
          description:
            "Controls how markers are added to the map. 'mentioned' (default) adds markers for places explicitly named in the response. 'all' adds markers for all search results. 'none' adds no markers.",
          enum: ['mentioned', 'all', 'none'],
        },
        systemInstruction: {
          type: Type.STRING,
          description:
            "Optional system instructions for the grounding tool to customize the output format or tone.",
        },
        enableWidget: {
            type: Type.BOOLEAN,
            description: "Whether to display the Google Maps Place Widget (default: true).",
        }
      },
      required: ['query'],
    },
    isEnabled: true,
  },
  {
    name: 'frameEstablishingShot',
    description:
      "Moves the camera to a high-level establishing view of a specific location (city, state, or landmark). Useful for starting a tour or changing the general region.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        geocode: {
          type: Type.STRING,
          description:
            "The address or name of the location to frame (e.g., 'Chicago, IL', 'Paris, France').",
        },
        lat: {
          type: Type.NUMBER,
          description: 'The latitude of the location (optional if geocode is provided).',
        },
        lng: {
          type: Type.NUMBER,
          description: 'The longitude of the location (optional if geocode is provided).',
        },
      },
    },
    isEnabled: true,
  },
  {
    name: 'frameLocations',
    description:
      "Adjusts the map view to frame a list of specific locations or addresses. Can also add markers to these locations. Use this to highlight an itinerary or a set of search results.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        locations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER },
            },
            required: ['lat', 'lng'],
          },
          description: 'List of explicit lat/lng coordinates to frame.',
        },
        geocode: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'List of addresses or place names to geocode and frame.',
        },
        markers: {
          type: Type.BOOLEAN,
          description:
            'If true, adds markers to the map for the framed locations. If false, just moves the camera.',
        },
        zoomLevel: {
            type: Type.STRING,
            description: "Target zoom level for the view: 'close' (street level), 'medium' (neighborhood), 'far' (city view). Default is 'medium'.",
            enum: ['close', 'medium', 'far']
        }
      },
    },
    isEnabled: true,
  },
];
