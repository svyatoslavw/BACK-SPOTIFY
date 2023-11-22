import { faker } from '@faker-js/faker'
import { PrismaClient, Track } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const createPlaylist = async () => {
	const playlist = await prisma.playlist.create({
		data: {
			name: 'Template',
			image: '',
			slug: 'template',
			tracks: {
				connect: [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]
			},
			userId: 2
		}
	})
	return playlist
}

const createTracks = async (quantity: number) => {
	const tracks: Track[] = []

	for (let i = 0; i < quantity; i++) {
		const trackName = faker.music.songName()
		const trackDate = faker.date.future()

		const track = await prisma.track.create({
			data: {
				name: trackName,
				image: '/uploads/9.jpg',
				file: '/uploads/test.mp3',
				releaseDate: trackDate,
				artist: {
					connect: {
						id: 2
					}
				}
			}
		})
		tracks.push(track)
	}
	console.log(`Created ${tracks.length} tracks`)
}

async function main() {
	console.log('Start seeding...')
	await createTracks(12)
	//await createPlaylist()
	//await createPremium()
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect
	})
