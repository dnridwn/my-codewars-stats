const { createApp, toRaw } = Vue

createApp({
    data() {
        return {
            username: 'dnridwn',
            name: '',
            clanName: '',
            skills: '',
            totalCompleted: 0,
            rank: '',
            honor: '',
            leaderboardPosition: '',
            languageRanks: [],
            completedKatas: []
        }
    },
    methods: {
        getUser() {
            axios.get(`https://www.codewars.com/api/v1/users/${this.username}`)
                .then(response => {
                    const responseData = response.data;

                    this.name = responseData.name
                    this.clanName = responseData.clan
                    this.skills = responseData.skills.map(skill => {
                        if (skill.toLowerCase() == 'php') {
                            return skill.toUpperCase()
                        }
                        return skill[0].toUpperCase() + skill.slice(1, skill.length)
                    }).join(', ')
                    this.totalCompleted = responseData.codeChallenges.totalCompleted
                    this.honor = responseData.honor.toLocaleString('en-US')
                    this.leaderboardPosition = responseData.leaderboardPosition.toLocaleString('en-US')
                    this.languageRanks = toRaw(responseData.ranks.languages)
                    this.rank = responseData.ranks.overall.name
                })
                .catch(error => {
                    console.error(error)
                });
        },
        getCompletedKata() {
            axios.get(`https://www.codewars.com/api/v1/users/${this.username}/code-challenges/completed?page=0`)
                .then(response => {
                    const responseData = response.data;
                    this.completedKatas = responseData.data.splice(0, 5).map(completedKata => {
                        completedKata.completedAtFormatted = new Date(completedKata.completedAt).toLocaleDateString("id-ID")
                        return completedKata
                    });
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    mounted() {
        this.getUser()
        this.getCompletedKata()
    }
})
.mount('#app')