import { faker } from '@faker-js/faker'
import { PrismaClient, Track } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const createPlaylist = async () => {
	// const playlist = await prisma.playlist.create({
	// 	data: {
	// 		name: 'Template',
	// 		image: '',
	// 		slug: 'template',
	// 		user: {
	// 			connect: {
	// 				id: 2
	// 			}
	// 		},
	// 		tracks: {
	// 			connect: {
	// 				id: 6
	// 			}
	// 		}
	// 	}
	// })
	// return playlist
	const tracks = await prisma.playlist.update({
		where: {
			id: 2
		},
		data: {
			tracks: {
				connect: {
					id: 10
				}
			}
		}
	})
	return tracks
}

const createTracks = async (quantity: number) => {
	const tracks: Track[] = []

	for (let i = 0; i < quantity; i++) {
		const trackName = faker.music.songName()
		const trackDate = faker.date.future()

		const track = await prisma.track.create({
			data: {
				name: trackName,
				image: '',
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
	console.log(`Created ${tracks.length} trakcs`)
}

async function main() {
	console.log('Start seeding...')
	await createPlaylist()
	//await createTracks(10)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect
	})
