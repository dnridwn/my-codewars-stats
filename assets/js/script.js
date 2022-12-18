const { createApp, toRaw } = Vue

createApp({
    data() {
        return {
            username: 'dnridwn',
            name: '',
            clanName: '',
            skills: '',
            totalCompleted: 0,
            honor: '',
            leaderboardPosition: '',
            languageRanks: [],

            currentCompletedKataPage: 0,
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
                    this.skills = responseData.skills.map(skill => skill[0].toUpperCase() + skill.slice(1, skill.length)).join(', ')
                    this.totalCompleted = responseData.codeChallenges.totalCompleted
                    this.honor = responseData.honor.toLocaleString('en-US')
                    this.leaderboardPosition = responseData.leaderboardPosition.toLocaleString('en-US')
                    this.languageRanks = toRaw(responseData.ranks.languages)

                    console.log(responseData)
                })
                .catch(error => {
                    console.error(error)
                });
        },
        getCompletedKata() {
            axios.get(`https://www.codewars.com/api/v1/users/${this.username}/code-challenges/completed?page=${this.currentCompletedKataPage}`)
                .then(response => {
                    const responseData = response.data;
                    this.completedKatas = responseData.data.splice(0, 5);

                    console.log(responseData)
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